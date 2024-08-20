import CreateExchangeDTO from "../../Domain/DTO/CreateExchangeDTO";
import IExchangeDocument from "./IExchangeDocument";
import UpdateStateRequest from "../../Application/Requests/UpdateStateRequest";

interface IExchangeCommand
{
    createExchange(createExchangeDTO: CreateExchangeDTO): Promise<IExchangeDocument>;
    deleteExchange(exchangeId: string): Promise<void>;
    changeState(updatedStateRequest:UpdateStateRequest): Promise<IExchangeDocument>;
}
export default IExchangeCommand;