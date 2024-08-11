import CreateExchangeRequest from "../../Application/Requests/CreateExchangeRequest";
import IExchangeCommand from "../../Infrastructure/Interfaces/IExchangeCommand";
import IExchangeDocument from "../../Infrastructure/Interfaces/IExchangeDocument";
import IExchangeQuery from "../../Infrastructure/Interfaces/IExchangeQuery";
import CreateExchangeDTO from "../DTO/CreateExchangeDTO";
import Exchange from "../Entities/Exchange";
import IExchangeServices from "../Interfaces/IExchangeServices";

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
        const createExchangeDTO: CreateExchangeDTO = new CreateExchangeDTO(createExchangeRequest.senderUserId, createExchangeRequest.senderClotheId, createExchangeRequest.receiverUserId, createExchangeRequest.receiverClotheId, state);
        const createdExchange: Exchange = await this.exchangeCommand.createExchange(createExchangeDTO);
        return createdExchange;
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
export default ExchangeServices;
