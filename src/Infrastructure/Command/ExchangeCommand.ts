import CreateExchangeDTO from "../../Domain/DTO/CreateExchangeDTO";
import IExchangeCommand from "../Interfaces/IExchangeCommand";
import IExchangeDocument from "../Interfaces/IExchangeDocument";
import exchangeModel from "../Persistence/Models/ExchangeModel";
import UpdateStateRequest from "../../Application/Requests/UpdateStateRequest";

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
    async changeState(updateStateRequest: UpdateStateRequest): Promise<IExchangeDocument> {
        const retrievedExchange : IExchangeDocument | null = await exchangeModel.findByIdAndUpdate(updateStateRequest.id, updateStateRequest, {new:true})
        if(retrievedExchange) {
            return retrievedExchange
        }else{
            throw new Error("No se encontró el intercambio.");
        }
    }       
}
export default ExchangeCommand;