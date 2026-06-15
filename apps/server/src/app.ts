import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { CLIENT_URL, COOKIE_SECRET } from './includes/config/mainConfig';
import notFoundMiddleware from './middleware/notFoundMiddleware';
import errorMiddleware from './middleware/errorMiddleware';
import routes from './routes';

const app = express();

app.set('trust proxy', 1);

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.use('/', routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
