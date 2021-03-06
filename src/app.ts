import express, { Request, Response } from 'express';
import path from 'path';
import cors from './middlewares/cors';
import errorHandler from './middlewares/errorHandler';
import logMiddleware from './middlewares/logMiddleware';
import routes from './routes';
import log from './utils/log';
require('express-async-errors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors);
app.use(logMiddleware);
app.use(routes);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.listen(PORT, () => log(`Server started at http://localhost:${PORT}`));
