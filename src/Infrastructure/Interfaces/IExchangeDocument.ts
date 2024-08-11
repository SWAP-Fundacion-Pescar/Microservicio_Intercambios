import { Document } from "mongoose"

interface IExchangeDocument extends Document
{
    senderUserId: string;
    senderClotheId: string;
    receiverUserId: string;
    receiverClotheId: string;
    state: string;
    createdAt: Date;
    finishedAt: Date;
}
export default IExchangeDocument;