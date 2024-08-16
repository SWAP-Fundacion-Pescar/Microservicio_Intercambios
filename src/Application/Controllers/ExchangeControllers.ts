import { Request, Response, NextFunction } from 'express';
import IExchangeServices from "../../Domain/Interfaces/IExchangeServices";
import IExchangeDocument from "../../Infrastructure/Interfaces/IExchangeDocument";
import CreateExchangeRequest from '../Requests/CreateExchangeRequest';
import Exchange from '../../Domain/Entities/Exchange';

import ExchangeQuery from '../../Infrastructure/Query/ExchangeQuery';


class ExchangeController
{
    private exchangeServices: IExchangeServices;
    constructor(exchangeServices: IExchangeServices)
    {
        this.exchangeServices = exchangeServices;
        this.createExchange = this.createExchange.bind(this);
    }
    async createExchange( req: Request, res: Response, next: NextFunction ): Promise<void> { //método asíncrono
        const { senderUserId, senderClotheId, receiverUserId, receiverClotheId }: CreateExchangeRequest = req.body; //extraigo datos de la solicitud y digo que son de tipo "createExchangeRequest" (modelo de solicitud). ¿Acá se verifican los tipos de datos?
        const createExchangeRequest: CreateExchangeRequest = new CreateExchangeRequest(senderUserId, senderClotheId, receiverUserId, receiverClotheId) //instancio "CreateExchangeRequest" con los datos extraidos
        const createdExchange: Exchange = await this.exchangeServices.createExchange(createExchangeRequest);
        console.log(createExchangeRequest);
        res.status(200).send(createdExchange);
    }
    deleteExchange(exchangeId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changeState(state: string): Promise<IExchangeDocument> {
        throw new Error("Method not implemented.");
    }
    async getExchangeById(req: Request, res: Response, next: NextFunction): Promise<void> { //debería ser: Promise<IExchangeDocument>
        try{
            const exchangeQuery = new ExchangeQuery() //Instancio la clase que me va a permitir usar el método que consulta
            const retrievedExchange : IExchangeDocument = await exchangeQuery.getExchangeById(req.params.exchangeId) //Uso el método y le paso el id obtenido por params
            res.status(200).send(retrievedExchange)
        }catch(err){
            console.error(err)
        }
    }
    async getExchangeByUserId(req: Request, res: Response, next: NextFunction): Promise<void>{ //debería ser: Promise<Array<IExchangeDocument>>
        try{
            const exchangeQuery = new ExchangeQuery() 
            const retrievedUsers : Array<IExchangeDocument> | null = await exchangeQuery.getExchangeByUserId(req.params.userId) 
            res.status(200).send(retrievedUsers)
        }catch(err){
            console.error(err)
        }
    }
    async getExchangeByClotheId(req: Request, res: Response, next: NextFunction): Promise<void> { //debería ser: Promise<IExchangeDocument>
        try{
            const exchangeQuery = new ExchangeQuery() 
            const retrievedClothe : IExchangeDocument | null = await exchangeQuery.getExchangeByClotheId(req.params.clotheId) 
            res.status(200).send(retrievedClothe)
        }catch(err){
            console.error(err)
        }
    }
}
export default ExchangeController;