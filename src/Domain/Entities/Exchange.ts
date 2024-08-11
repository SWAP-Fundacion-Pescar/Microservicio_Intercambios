class Exchange
{
    id?: string;
    senderUserId: string;
    senderClotheId: string;
    receiverUserId: string;
    receiverClotheId: string;
    state: string;
    createdAt?: Date;
    finishedAt?: Date;
    constructor(senderUserId: string, senderClotheId: string, receiverUserId: string, receiverClotheId: string, state: string, createdAt?: Date, finishedAt?: Date, id?: string)
    {
        this.id = id;
        this.senderUserId = senderUserId;
        this.senderClotheId = senderClotheId;
        this.receiverUserId = receiverUserId;
        this.receiverClotheId = receiverClotheId;
        this.state = state;
        this.createdAt = createdAt;
        this.finishedAt = finishedAt;
    }
}
export default Exchange;