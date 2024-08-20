import IExchangeDocument from "../Interfaces/IExchangeDocument";
import IExchangeQuery from "../Interfaces/IExchangeQuery";
import exchangeModel from '../Persistence/Models/ExchangeModel';

class ExchangeQuery implements IExchangeQuery
{
    async getExchangeById(exchangeId: string): Promise<IExchangeDocument> {
        const retrievedExchange : IExchangeDocument | null = await exchangeModel.findOne({ _id : exchangeId });
        if(!retrievedExchange) throw new Error('No se ha encontrado el intercambio buscado');
        return retrievedExchange
    }
    async getExchangeByUserId(userId: string): Promise<Array<IExchangeDocument>> {
        const retrievedUsers : Array<IExchangeDocument> | null = await exchangeModel.findOne({$or: [{senderUserId : userId}, {receiverUserId: userId}]});
        if(!retrievedUsers) throw new Error('Este usuario no tiene intercambios activos');
        return retrievedUsers
    }
    async getExchangeByClotheId(clotheId: string): Promise<IExchangeDocument> {
        const retrievedClothe : IExchangeDocument | null = await exchangeModel.findOne({$or: [{senderClotheId : clotheId}, {receiverClotheId: clotheId}]});
        if(!retrievedClothe) throw new Error('Ha ocurrido un error. La prenda buscada no está disponible');
        return retrievedClothe
    }    
}
export default ExchangeQuery;