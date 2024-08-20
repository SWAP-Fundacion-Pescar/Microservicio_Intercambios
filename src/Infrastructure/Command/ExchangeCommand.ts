import CreateExchangeDTO from "../../Domain/DTO/CreateExchangeDTO";
import IExchangeCommand from "../Interfaces/IExchangeCommand";
import IExchangeDocument from "../Interfaces/IExchangeDocument";
import exchangeModel from "../Persistence/Models/ExchangeModel";
import UpdateStateRequest from "../../Application/Requests/UpdateStateRequest";
import NotFoundException from "../../Application/Exceptions/NotFoundException";

class ExchangeCommand implements IExchangeCommand
{
    async createExchange(createExchangeDTO: CreateExchangeDTO): Promise<IExchangeDocument> {
        const createdExchange: IExchangeDocument = new exchangeModel(createExchangeDTO);
        await createdExchange.save();
        return createdExchange;
    }     
    async deleteExchange(exchangeId: string): Promise<void> {
        const retrievedExchange : IExchangeDocument | null = await exchangeModel.findByIdAndDelete(exchangeId)
        if(!retrievedExchange) throw new NotFoundException('No se encontró el intercambio.');
    }
    async changeState(updateStateRequest: UpdateStateRequest): Promise<IExchangeDocument> {
        const retrievedExchange : IExchangeDocument | null = await exchangeModel.findByIdAndUpdate(updateStateRequest.id, updateStateRequest, {new:true})
        if(retrievedExchange) {
            return retrievedExchange
        }else{
            throw new NotFoundException('No se encontró el intercambio.');
        }
    }       
}
export default ExchangeCommand;