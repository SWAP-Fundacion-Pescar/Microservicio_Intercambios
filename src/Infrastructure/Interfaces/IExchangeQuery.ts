import IExchangeDocument from "./IExchangeDocument";

interface IExchangeQuery
{
    getExchangeById(exchangeId: string): Promise<IExchangeDocument>;
    getExchangeByUserId(userId: string): Promise<Array<IExchangeDocument>>;
    getExchangeByClotheId(clotheId: string): Promise<IExchangeDocument>;
};
export default IExchangeQuery;