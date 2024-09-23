import express from "express";
import morgan from "morgan";
import MongoDB from "./Infrastructure/Persistence/Config/MongoDB";
import exchangeRouter from "./Application/Routers/ExchangeRouter";
import errorHandler from "./Application/Middleware/ErrorHandler";
import cors from 'cors';
MongoDB();

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', exchangeRouter);
app.use(errorHandler);

export default app;
