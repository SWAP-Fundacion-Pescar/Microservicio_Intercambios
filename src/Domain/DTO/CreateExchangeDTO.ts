class CreateExchangeDTO
{
    senderUserId: string;
    senderClotheId: string;
    receiverUserId: string;
    receiverClotheId: string;
    state: string;
    constructor(senderUserId: string, senderClotheId: string, receiverUserId: string, receiverClotheId: string, state: string)
    {
        this.senderUserId = senderUserId;
        this.senderClotheId = senderClotheId;
        this.receiverUserId = receiverUserId;
        this.receiverClotheId = receiverClotheId;
        this.state = state;
    }
}
export default CreateExchangeDTO;