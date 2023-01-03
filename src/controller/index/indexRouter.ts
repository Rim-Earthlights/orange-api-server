import Express from 'express';

export const indexRouter = Express.Router();

/**
 * /GET
 * Index表示
 */
indexRouter.get('/', (req: Express.Request, res: Express.Response) => {
    res.status(200).send({ result: true });
});
