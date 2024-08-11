import IExchangeDocument from "../Interfaces/IExchangeDocument";
import IExchangeQuery from "../Interfaces/IExchangeQuery";

class ExchangeQuery implements IExchangeQuery
{
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
export default ExchangeQuery;