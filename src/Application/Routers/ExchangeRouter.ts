import { Router } from "express";
import IExchangeCommand from "../../Infrastructure/Interfaces/IExchangeCommand";
import ExchangeCommand from "../../Infrastructure/Command/ExchangeCommand";
import IExchangeQuery from "../../Infrastructure/Interfaces/IExchangeQuery";
import ExchangeQuery from "../../Infrastructure/Query/ExchangeQuery";
import IExchangeServices from "../../Domain/Interfaces/IExchangeServices";
import ExchangeServices from "../../Domain/Services/ExchangeServices";
import ExchangeController from "../Controllers/ExchangeControllers";
import { validateCreateExchange, validateDeleteExchange, validateUpdateExchange } from "../Middleware/Validators/ExchangeValidator";
import validationErrorHandler from "../Middleware/Validators/ValidationErrorHandler";
import { authenticateJwt } from "../Middleware/PassportMiddleware";
import ClotheMicroserviceClient from "../../Infrastructure/Clients/ClotheMicroserviceClient";
import UserMicroserviceClient from "../../Infrastructure/Clients/UserMicroserviceClient";
import NotificationClientMicroservice from "../../Infrastructure/Clients/NotificationMicroserviceClient";

const clotheMicroserviceClient : ClotheMicroserviceClient = new ClotheMicroserviceClient();
const userMicroserviceClient : UserMicroserviceClient = new UserMicroserviceClient();
const exchangeCommand: IExchangeCommand = new ExchangeCommand();
const exchangeQuery: IExchangeQuery = new ExchangeQuery();
const notificationClient: NotificationClientMicroservice = new NotificationClientMicroservice();
const exchangeServices: IExchangeServices = new ExchangeServices(exchangeCommand, exchangeQuery, notificationClient);
const exchangeController: ExchangeController = new ExchangeController(exchangeServices, clotheMicroserviceClient, userMicroserviceClient);

const exchangeRouter = Router();

exchangeRouter.get('/', (req,res)=>{
    // res.json('Hola, estoy conectado!') //funcionando
    res.status(200).send('Hola') //funcionando - con send() envio objeto - requiere status
})

exchangeRouter.post('/exchange', authenticateJwt, validateCreateExchange, validationErrorHandler, exchangeController.createExchange);//path + callback
exchangeRouter.get('/exchange/:exchangeId', authenticateJwt, exchangeController.getExchangeById) 
exchangeRouter.get('/exchange/user', authenticateJwt, exchangeController.getExchangeByUserId)
exchangeRouter.get('/exchange/clothe/:clotheId', authenticateJwt, exchangeController.getExchangeByClotheId)

exchangeRouter.put('/exchange/changeState', authenticateJwt, validateUpdateExchange, validationErrorHandler, exchangeController.changeState)
exchangeRouter.delete('/exchange/delete/:exchangeId', authenticateJwt, validateDeleteExchange, validationErrorHandler, exchangeController.deleteExchange)

export default exchangeRouter;
