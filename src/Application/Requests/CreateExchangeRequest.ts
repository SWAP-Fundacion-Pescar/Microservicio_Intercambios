class CreateExchangeRequest //modelo para creación de solicitud de intercambio 
{
    senderUserId: string;
    senderClotheId: string;
    receiverUserId: string;
    receiverClotheId: string;
    constructor(senderUserId: string, senderClotheId: string, receiverUserId: string, receiverClotheId: string)
    {
        this.senderUserId = senderUserId;
        this.senderClotheId = senderClotheId;
        this.receiverUserId = receiverUserId;
        this.receiverClotheId = receiverClotheId;
    }
}
export default CreateExchangeRequest;