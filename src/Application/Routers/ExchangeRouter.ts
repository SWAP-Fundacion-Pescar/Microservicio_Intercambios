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

exchangeRouter.get('/', (req,res)=>{
    // res.json('Hola, estoy conectado!') //funcionando
    res.status(200).send('Hola') //funcionando - con send() envio objeto - requiere status
})

exchangeRouter.post('/exchange', exchangeController.createExchange);//path + callback
exchangeRouter.get('/exchange/:exchangeId', exchangeController.getExchangeById) 
exchangeRouter.get('/exchange/user/:userId', exchangeController.getExchangeByUserId)
exchangeRouter.get('/exchange/clothe/:clotheId', exchangeController.getExchangeByClotheId)

exchangeRouter.put('/exchange/changeState', exchangeController.changeState)
exchangeRouter.delete('/exchange/delete/:exchangeId', exchangeController.deleteExchange)



export default exchangeRouter;
