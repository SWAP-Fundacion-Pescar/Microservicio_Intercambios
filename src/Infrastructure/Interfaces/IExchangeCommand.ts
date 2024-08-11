import CreateExchangeDTO from "../../Domain/DTO/CreateExchangeDTO";
import IExchangeDocument from "./IExchangeDocument";

interface IExchangeCommand
{
    createExchange(createExchangeDTO: CreateExchangeDTO): Promise<IExchangeDocument>;
    deleteExchange(exchangeId: string): Promise<void>;
    changeState(state: string): Promise<IExchangeDocument>;
}
export default IExchangeCommand;