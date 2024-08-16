import mongoose, {Schema} from "mongoose";
import IExchangeDocument from "../../Interfaces/IExchangeDocument";

const exchangeSchema: Schema<IExchangeDocument> = new mongoose.Schema(
    {
        senderUserId: {type: String, required: true},
        senderClotheId: {type: String, required: true},
        receiverUserId: {type: String, required: true},
        receiverClotheId: {type: String, required: true},
        state: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
        finishedAt: {type: Date}
    });

const exchangeModel = mongoose.model('Exchange', exchangeSchema);

export default exchangeModel;