import { Request, Response, NextFunction } from 'express';
import IExchangeServices from "../../Domain/Interfaces/IExchangeServices";
import IExchangeDocument from "../../Infrastructure/Interfaces/IExchangeDocument";
import CreateExchangeRequest from '../Requests/CreateExchangeRequest';
import UpdateStateRequest from '../Requests/UpdateStateRequest';
import Exchange from '../../Domain/Entities/Exchange';

class ExchangeController
{
    private exchangeServices: IExchangeServices;
    constructor(exchangeServices: IExchangeServices)
    {
        this.exchangeServices = exchangeServices;
        this.createExchange = this.createExchange.bind(this);
        this.getExchangeById = this.getExchangeById.bind(this);
        this.getExchangeByUserId = this.getExchangeByUserId.bind(this);
        this.getExchangeByClotheId = this.getExchangeByClotheId.bind(this);
        this.changeState = this.changeState.bind(this);
        this.deleteExchange = this.deleteExchange.bind(this);
    }
    async createExchange( req: Request, res: Response, next: NextFunction ): Promise<void> { //método asíncrono
        const { senderUserId, senderClotheId, receiverUserId, receiverClotheId }: CreateExchangeRequest = req.body; //extraigo datos de la solicitud y digo que son de tipo "createExchangeRequest" (modelo de solicitud). ¿Acá se verifican los tipos de datos?
        const createExchangeRequest: CreateExchangeRequest = new CreateExchangeRequest(senderUserId, senderClotheId, receiverUserId, receiverClotheId) //instancio "CreateExchangeRequest" con los datos extraidos: creo solicitud con la que consulto DB
        const createdExchange: Exchange = await this.exchangeServices.createExchange(createExchangeRequest);//para crear un intercambio, paso como parámetro la solicitud de intercambio 
        console.log(createExchangeRequest);
        res.status(200).send(createdExchange);
    }
    async deleteExchange(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const id : string = req.params.exchangeId;
            await this.exchangeServices.deleteExchange(id) 
            res.status(200).send('ok')
        }catch (err){
            next(err);
        }
    }
    async changeState( req: Request, res: Response, next: NextFunction ): Promise<void> {
        try{
            const {id, state} : UpdateStateRequest = req.body;
            const updateStateRequest: UpdateStateRequest = {
                id: id,
                state: state
            }
            const changedState : IExchangeDocument = await this.exchangeServices.changeState(updateStateRequest);
            res.status(200).send(changedState)
        }catch(err){
            next(err);
        }
    }
    async getExchangeById(req: Request, res: Response, next: NextFunction): Promise<void> { //debería ser: Promise<IExchangeDocument>
        try{
            //const exchangeId: string = req.params.exchangeId as string; //Forma alternativa 
            const retrievedExchange : IExchangeDocument = await this.exchangeServices.getExchangeById(req.params.exchangeId) //Uso el método traído de los servicios y le paso el id obtenido por params
            res.status(200).send(retrievedExchange)
        }catch(err){
            next(err);
        }
    }
    async getExchangeByUserId(req: Request, res: Response, next: NextFunction): Promise<void>{ //debería ser: Promise<Array<IExchangeDocument>>
        try{
            const retrievedUsers : Array<IExchangeDocument> | null = await this.exchangeServices.getExchangeByUserId(req.params.userId) 
            res.status(200).send(retrievedUsers)
        }catch(err){
            next(err);
        }
    }
    async getExchangeByClotheId(req: Request, res: Response, next: NextFunction): Promise<void> { //debería ser: Promise<IExchangeDocument>
        try{
            const retrievedClothe : IExchangeDocument | null = await this.exchangeServices.getExchangeByClotheId(req.params.clotheId) 
            res.status(200).send(retrievedClothe)
        }catch(err){
            next(err);
        }
    }
}
export default ExchangeController;