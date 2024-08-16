import CreateExchangeRequest from "../../Application/Requests/CreateExchangeRequest";
import IExchangeDocument from "../../Infrastructure/Interfaces/IExchangeDocument";
import Exchange from "../Entities/Exchange";

interface IExchangeServices
{
    createExchange(createExchangeRequest: CreateExchangeRequest): Promise<Exchange>; //nombre de método + qué recibe y tipo de dato + qué devuelve y tipo de dato
    deleteExchange(exchangeId: string): Promise<void>;
    changeState(state: string): Promise<IExchangeDocument>;

    getExchangeById(exchangeId: string): Promise<IExchangeDocument>;
    getExchangeByUserId(userId: string): Promise<Array<IExchangeDocument>>;
    getExchangeByClotheId(clotheId: string): Promise<IExchangeDocument>;    
};
export default IExchangeServices;