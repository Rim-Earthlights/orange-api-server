import { S3Client } from '@aws-sdk/client-s3';
import { CONFIG } from '../config/config';

const credentials = {
    accessKeyId: CONFIG.S3.ID,
    secretAccessKey: CONFIG.S3.SECRET
};

export class S3 {
    public static client = new S3Client({ region: 'ap-northeast-1', credentials });
}
