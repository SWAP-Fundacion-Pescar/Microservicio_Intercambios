import CreateExchangeDTO from "../../Domain/DTO/CreateExchangeDTO";
import IExchangeCommand from "../Interfaces/IExchangeCommand";
import IExchangeDocument from "../Interfaces/IExchangeDocument";
import exchangeModel from "../Persistence/Models/ExchangeModel";

class ExchangeCommand implements IExchangeCommand
{
    async createExchange(createExchangeDTO: CreateExchangeDTO): Promise<IExchangeDocument> {
        const createdExchange: IExchangeDocument = new exchangeModel(createExchangeDTO);
        await createdExchange.save();
        return createdExchange;
    }     
    deleteExchange(exchangeId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changeState(state: string): Promise<IExchangeDocument> {
        throw new Error("Method not implemented.");
    }       
}
export default ExchangeCommand;