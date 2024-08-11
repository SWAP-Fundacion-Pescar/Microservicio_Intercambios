import { Router } from "express";
import IExchangeCommand from "../../Infrastructure/Interfaces/IExchangeCommand";
import ExchangeCommand from "../../Infrastructure/Command/ExchangeCommand";
import IExchangeQuery from "../../Infrastructure/Interfaces/IExchangeQuery";
import ExchangeQuery from "../../Infrastructure/Query/ExchangeQuery";
import IExchangeServices from "../../Domain/Interfaces/IExchangeServices";
import ExchangeServices from "../../Domain/Services/ExchangeServices";
import ExchangeController from "../Controllers/ExchangeControllers";

const exchangeCommand: IExchangeCommand = new ExchangeCommand();
const exchangeQuery: IExchangeQuery = new ExchangeQuery();
const exchangeServices: IExchangeServices = new ExchangeServices(exchangeCommand, exchangeQuery);
const exchangeController: ExchangeController = new ExchangeController(exchangeServices);

const exchangeRouter = Router();

exchangeRouter.post('/exchange', exchangeController.createExchange);
export default exchangeRouter;
