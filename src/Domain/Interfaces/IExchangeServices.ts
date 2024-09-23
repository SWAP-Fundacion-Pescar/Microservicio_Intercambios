import CreateExchangeRequest from "../../Application/Requests/CreateExchangeRequest";
import UpdateStateRequest from "../../Application/Requests/UpdateStateRequest";
import IExchangeDocument from "../../Infrastructure/Interfaces/IExchangeDocument";
import Exchange from "../Entities/Exchange";

interface IExchangeServices
{
    createExchange(createExchangeRequest: CreateExchangeRequest, authorization: string): Promise<Exchange>; //nombre de método + qué recibe y tipo de dato + qué devuelve y tipo de dato
    deleteExchange(exchangeId: string): Promise<void>;
    changeState(updateStateRequest: UpdateStateRequest, authorization: string): Promise<IExchangeDocument>;

    getExchangeById(exchangeId: string): Promise<IExchangeDocument>;
    getExchangeByUserId(userId: string): Promise<Array<IExchangeDocument>>;
    getExchangeByClotheId(clotheId: string): Promise<IExchangeDocument>;    
};
export default IExchangeServices;