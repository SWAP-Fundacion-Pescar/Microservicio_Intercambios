import CreateExchangeRequest from "../../Application/Requests/CreateExchangeRequest";
import IExchangeCommand from "../../Infrastructure/Interfaces/IExchangeCommand";
import IExchangeDocument from "../../Infrastructure/Interfaces/IExchangeDocument";
import IExchangeQuery from "../../Infrastructure/Interfaces/IExchangeQuery";
import CreateExchangeDTO from "../DTO/CreateExchangeDTO";
import Exchange from "../Entities/Exchange";
import IExchangeServices from "../Interfaces/IExchangeServices";
import UpdateStateRequest from "../../Application/Requests/UpdateStateRequest";

class ExchangeServices implements IExchangeServices
{
    private exchangeCommand: IExchangeCommand;
    private exchangeQuery: IExchangeQuery;
    constructor(exchangeCommand: IExchangeCommand, exchangeQuery: IExchangeQuery)
    {
        this.exchangeCommand = exchangeCommand;
        this.exchangeQuery = exchangeQuery;
    }

    async createExchange(createExchangeRequest: CreateExchangeRequest): Promise<Exchange> {
        const state: string = 'En proceso';
        const createExchangeDTO: CreateExchangeDTO = new CreateExchangeDTO(createExchangeRequest.senderUserId, createExchangeRequest.senderClotheId, createExchangeRequest.receiverUserId, createExchangeRequest.receiverClotheId, state); //objeto de solicitud
        const createdExchange: Exchange = await this.exchangeCommand.createExchange(createExchangeDTO); //objeto de intercambio 
        return createdExchange;
    }
    deleteExchange(exchangeId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async changeState(updateStateRequest: UpdateStateRequest): Promise<IExchangeDocument> {
        const updatedStateExchange : IExchangeDocument = await this.exchangeCommand.changeState(updateStateRequest)
        return updatedStateExchange;
    }
    async getExchangeById(exchangeId: string): Promise<IExchangeDocument> {
        const retrievedExchange: IExchangeDocument = await this.exchangeQuery.getExchangeById(exchangeId);
        return retrievedExchange;
    }
    async getExchangeByUserId(userId: string): Promise<Array<IExchangeDocument>> {
        const retrievedUsers: Array<IExchangeDocument> | null = await this.exchangeQuery.getExchangeByUserId(userId);
        return retrievedUsers;
    }
    async getExchangeByClotheId(clotheId: string): Promise<IExchangeDocument> {
        const retrievedClothe: IExchangeDocument = await this.exchangeQuery.getExchangeByClotheId(clotheId);
        return retrievedClothe;
    }    
}
export default ExchangeServices;
