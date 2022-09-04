import cookieParser from 'cookie-parser';
import express from 'express';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
routes(app);

export default app;
