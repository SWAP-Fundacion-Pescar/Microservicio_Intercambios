import { Request, Response, NextFunction } from 'express';
import IExchangeServices from "../../Domain/Interfaces/IExchangeServices";
import IExchangeDocument from "../../Infrastructure/Interfaces/IExchangeDocument";
import CreateExchangeRequest from '../Requests/CreateExchangeRequest';
import Exchange from '../../Domain/Entities/Exchange';

class ExchangeController
{
    private exchangeServices: IExchangeServices;
    constructor(exchangeServices: IExchangeServices)
    {
        this.exchangeServices = exchangeServices;
        this.createExchange = this.createExchange.bind(this);
    }
    async createExchange( req: Request, res: Response, next: NextFunction ): Promise<void> {
        const { senderUserId, senderClotheId, receiverUserId, receiverClotheId }: CreateExchangeRequest = req.body;
        const createExchangeRequest: CreateExchangeRequest = new CreateExchangeRequest(senderUserId, senderClotheId, receiverUserId, receiverClotheId)
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
    getExchangeById(exchangeId: string): Promise<IExchangeDocument> {
        throw new Error("Method not implemented.");
    }
    getExchangeByUserId(userId: string): Promise<Array<IExchangeDocument>> {
        throw new Error("Method not implemented.");
    }
    getExchangeByClotheId(clotheId: string): Promise<IExchangeDocument> {
        throw new Error("Method not implemented.");
    }
}
export default ExchangeController;