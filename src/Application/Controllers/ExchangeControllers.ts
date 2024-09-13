import { Request, Response, NextFunction } from 'express';
import IExchangeServices from "../../Domain/Interfaces/IExchangeServices";
import IExchangeDocument from "../../Infrastructure/Interfaces/IExchangeDocument";
import CreateExchangeRequest from '../Requests/CreateExchangeRequest';
import UpdateStateRequest from '../Requests/UpdateStateRequest';
import Exchange from '../../Domain/Entities/Exchange';
import ClotheMicroserviceClient from '../../Infrastructure/Clients/ClotheMicroserviceClient';
import UnauthorizedException from '../Exceptions/UnauthorizedException';
import axios, {AxiosResponse} from 'axios';
import UserMicroserviceClient from '../../Infrastructure/Clients/UserMicroserviceClient';

interface User{
    id:string;
}

class ExchangeController
{
    private exchangeServices: IExchangeServices;
    private clotheMicroserviceClient : ClotheMicroserviceClient;
    private userMicroserviceClient : UserMicroserviceClient;
    constructor(exchangeServices: IExchangeServices, clotheMicroserviceClient: ClotheMicroserviceClient, userMicroserviceClient : UserMicroserviceClient)
    {
        this.exchangeServices = exchangeServices;
        this.clotheMicroserviceClient = clotheMicroserviceClient;
        this.userMicroserviceClient = userMicroserviceClient;
        this.createExchange = this.createExchange.bind(this);
        this.getExchangeById = this.getExchangeById.bind(this);
        this.getExchangeByUserId = this.getExchangeByUserId.bind(this);
        this.getExchangeByClotheId = this.getExchangeByClotheId.bind(this);
        this.changeState = this.changeState.bind(this);
        this.deleteExchange = this.deleteExchange.bind(this);
    }
    async createExchange( req: Request, res: Response, next: NextFunction ): Promise<void> { //método asíncrono
        try {
            const user = req.user as User;
            const { senderClotheId, receiverUserId, receiverClotheId }: CreateExchangeRequest = req.body; //extraigo datos de la solicitud y digo que son de tipo "createExchangeRequest" (modelo de solicitud). ¿Acá se verifican los tipos de datos?
            const retrievedReceiverUser : AxiosResponse = await this.userMicroserviceClient.getUserById(receiverUserId);
            const retrievedSenderClothe : AxiosResponse = await this.clotheMicroserviceClient.getClotheById(senderClotheId);
            const retrievedReceiverClothe : AxiosResponse = await this.clotheMicroserviceClient.getClotheById(receiverClotheId);

            if (retrievedSenderClothe.data.userId != user.id) {
                throw new UnauthorizedException('El usuario que quiere crear el intercambio no es el mismo que el dueño de la prenda.')
            }else if(retrievedReceiverClothe.data.userId != receiverUserId){
                throw new UnauthorizedException('El usuario que quiere aceptar el intercambio no es el mismo que el dueño de la prenda.')
            }
            const createExchangeRequest: CreateExchangeRequest = new CreateExchangeRequest(user.id, senderClotheId, receiverUserId, receiverClotheId) //instancio "CreateExchangeRequest" con los datos extraidos: creo solicitud con la que consulto DB
            if(!req.headers.authorization) throw new UnauthorizedException('No esta autorizado');
            const createdExchange: Exchange = await this.exchangeServices.createExchange(createExchangeRequest, req.headers.authorization);//para crear un intercambio, paso como parámetro la solicitud de intercambio 
            res.status(200).send(createdExchange);
        }catch (err){
            next(err);
        }
    }
    async deleteExchange(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const user = req.user as User;
            const {exchangeId} = req.params;
            const retreivedExchange = await this.exchangeServices.getExchangeById(exchangeId as string);
            if(retreivedExchange.senderUserId != user.id && retreivedExchange.receiverUserId != user.id) throw new UnauthorizedException('El usuario no pertenece al intercambio. ')
            await this.exchangeServices.deleteExchange(exchangeId as string) 
            res.status(200).send('ok')
        }catch (err){
            next(err);
        }
    }
    async changeState( req: Request, res: Response, next: NextFunction ): Promise<void> {
        try{
            const user = req.user as User;
            const {id, state} : UpdateStateRequest = req.body;
            const updateStateRequest: UpdateStateRequest = {
                id: id,
                state: state
            }
            const retreivedExchange = await this.exchangeServices.getExchangeById(id as string);
            if(retreivedExchange.senderUserId != user.id && retreivedExchange.receiverUserId != user.id) throw new UnauthorizedException('El usuario no pertenece al intercambio. ')
            const changedState : IExchangeDocument = await this.exchangeServices.changeState(updateStateRequest);
            res.status(200).send(changedState)
        }catch(err){
            next(err);
        }
    }
    async getExchangeById(req: Request, res: Response, next: NextFunction): Promise<void> { //debería ser: Promise<IExchangeDocument>
        try{
            const user = req.user as User;
            const retrievedExchange : IExchangeDocument = await this.exchangeServices.getExchangeById(req.params.exchangeId) //Uso el método traído de los servicios y le paso el id obtenido por params
            if(retrievedExchange.senderUserId != user.id && retrievedExchange.receiverUserId != user.id) throw new UnauthorizedException('El usuario no pertenece al intercambio. ')
            res.status(200).send(retrievedExchange)
        }catch(err){
            next(err);
        }
    }
    async getExchangeByUserId(req: Request, res: Response, next: NextFunction): Promise<void>{ //debería ser: Promise<Array<IExchangeDocument>>
        try{
            const user = req.user as User;
            const retrievedUsers : Array<IExchangeDocument> | null = await this.exchangeServices.getExchangeByUserId(user.id) 
            res.status(200).send(retrievedUsers)
        }catch(err){
            next(err);
        }
    }
    async getExchangeByClotheId(req: Request, res: Response, next: NextFunction): Promise<void> { //debería ser: Promise<IExchangeDocument>
        try{
            const user = req.user as User;
            const retrievedExchange : IExchangeDocument | null = await this.exchangeServices.getExchangeByClotheId(req.params.clotheId) 
            if(retrievedExchange.senderUserId != user.id && retrievedExchange.receiverUserId != user.id) throw new UnauthorizedException('El usuario no pertenece al intercambio. ')
            res.status(200).send(retrievedExchange)
        }catch(err){
            next(err);
        }
    }
}
export default ExchangeController;