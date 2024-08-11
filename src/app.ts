import express from "express";
import morgan from "morgan";
import MongoDB from "./Infrastructure/Persistence/Config/MongoDB";
import exchangeRouter from "./Application/Routers/ExchangeRouter";


MongoDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', exchangeRouter);
export default app;
