import Express from 'express';
import got from 'got';
import { S3 } from '../../function/s3';
import {
    GetObjectCommand,
    ListBucketsCommand,
    ListObjectsCommand,
    ObjectCannedACL,
    PutObjectCommand
} from '@aws-sdk/client-s3';
import multer from 'multer';
import fs from 'fs';

export const s3Router = Express.Router();

/**
 * /POST /s3/upload
 * S3にアップロード
 */
s3Router.post(
    '/s3/upload',
    multer({ dest: '/tmp' }).single('file'),
    async (req: Express.Request, res: Express.Response) => {
        const params = req.body;
        const bucket = params.bucket;
        const path = params.path;

        if (!req.file) {
            res.status(500).send({ status: 500, message: 'ファイルがありません' });
            return;
        }
        const content = fs.readFileSync(req.file.path, { encoding: 'utf-8' });
        const response = await S3.client.send(
            new PutObjectCommand({ ACL: ObjectCannedACL.public_read, Bucket: bucket, Key: path, Body: content })
        );

        if (response.$metadata.httpStatusCode !== 200) {
            res.status(500).send({ status: 500, message: 'アップロード失敗' });
            return;
        }

        res.status(200).send({ status: 200, message: 'アップロード成功' });
        res.end();
    }
);

/**
 * /GET /s3/download
 * S3からダウンロードする
 */
s3Router.get('/s3/download/:bucket/*', async (req: Express.Request, res: Express.Response) => {
    const params = req.params;
    const bucket = params.bucket;
    const path = params[0];

    if (!bucket || !path) {
        res.status(500).send({ status: 500, message: 'パラメータが不正です' });
        return;
    }

    const data = await S3.client.send(new GetObjectCommand({ Bucket: bucket, Key: path }));
    const body = await data.Body?.transformToByteArray();

    const filename = path.match(/([^/]*)\./)?.[1];
    const extend = path.match(/[^.]+$/);

    if (!filename || !extend) {
        res.status(500).send({ status: 500, message: 'ファイル名が不正です' });
    }

    if (!body) {
        res.status(500).send({ status: 500, message: 'S3からダウンロード失敗' });
        return;
    }

    switch (extend?.[0]) {
        case 'png':
            res.contentType('image/png');
            break;
        case 'jpg':
            res.contentType('image/jpeg');
            break;
        case 'gif':
            res.contentType('image/gif');
            break;
        case 'mp4':
            res.contentType('video/mp4');
            break;
        case 'mp3':
            res.contentType('audio/mp3');
            break;
        case 'txt':
            res.contentType('text/plain');
            break;
        case 'html':
            res.contentType('text/html');
            break;
        case 'zip':
            res.attachment(`${filename}.${extend}`);
            res.contentType('application/zip');
            break;
        default:
            res.contentType('application/octet-stream');
            break;
    }

    const buf = Buffer.from(body);
    res.send(buf);
    res.end();
});

/**
 * /GET /s3/list/:bucket/:page
 * S3のバケット内のオブジェクト一覧を取得
 */
s3Router.get('/s3/list/:bucket/:page', async (req: Express.Request, res: Express.Response) => {
    const params = req.params;
    const bucket = params.bucket;
    const page = params.page;

    const data = await S3.client.send(new ListObjectsCommand({ Bucket: bucket, MaxKeys: 100, Marker: page }));
    console.log(data);
    const contents = data.Contents;
    if (!contents) {
        res.status(500).send({ status: 500, message: 'S3のバケット内のオブジェクト一覧取得失敗' });
        return;
    }
    res.json({ contents, isTruncated: data.IsTruncated });
    res.end();
});

/**
 * /GET /s3/list
 * S3のバケット一覧を取得
 */
s3Router.get('/s3/list', async (req: Express.Request, res: Express.Response) => {
    const data = await S3.client.send(new ListBucketsCommand({}));
    const buckets = data.Buckets;
    if (!buckets) {
        res.status(500).send({ status: 500, message: 'S3のバケット一覧取得失敗' });
        return;
    }
    res.json(buckets);
    res.end();
});
