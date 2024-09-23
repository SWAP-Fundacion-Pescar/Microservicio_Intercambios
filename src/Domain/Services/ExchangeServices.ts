import CreateExchangeRequest from "../../Application/Requests/CreateExchangeRequest";
import IExchangeCommand from "../../Infrastructure/Interfaces/IExchangeCommand";
import IExchangeDocument from "../../Infrastructure/Interfaces/IExchangeDocument";
import IExchangeQuery from "../../Infrastructure/Interfaces/IExchangeQuery";
import CreateExchangeDTO from "../DTO/CreateExchangeDTO";
import Exchange from "../Entities/Exchange";
import IExchangeServices from "../Interfaces/IExchangeServices";
import UpdateStateRequest from "../../Application/Requests/UpdateStateRequest";
import NotificationClientMicroservice from "../../Infrastructure/Clients/NotificationMicroserviceClient";
import CreateNotificationRequest from "../../Infrastructure/Clients/Requests/CreateNotificationRequest";
import CreateChatRequest from "../../Infrastructure/Clients/Requests/CreateChatRequest";
import ChatMicroserviceClient from "../../Infrastructure/Clients/ChatMicroserviceClient";

class ExchangeServices implements IExchangeServices {
    private exchangeCommand: IExchangeCommand;
    private exchangeQuery: IExchangeQuery;
    private notificationClient: NotificationClientMicroservice;
    private chatClient: ChatMicroserviceClient;
    constructor(exchangeCommand: IExchangeCommand, exchangeQuery: IExchangeQuery, notificationClient: NotificationClientMicroservice, chatClient: ChatMicroserviceClient) {
        this.exchangeCommand = exchangeCommand;
        this.exchangeQuery = exchangeQuery;
        this.notificationClient = notificationClient;
        this.chatClient = chatClient;
    }

    async createExchange(createExchangeRequest: CreateExchangeRequest, authorization: string): Promise<Exchange> {
        const state: string = 'pending';
        const createExchangeDTO: CreateExchangeDTO = new CreateExchangeDTO(createExchangeRequest.senderUserId, createExchangeRequest.senderClotheId, createExchangeRequest.receiverUserId, createExchangeRequest.receiverClotheId, state); //objeto de solicitud
        const createdExchange: Exchange = await this.exchangeCommand.createExchange(createExchangeDTO); //objeto de intercambio
        this.createNotification(createExchangeRequest.receiverUserId, {exchangeId: createdExchange.id, senderClotheId: createdExchange.senderClotheId },'Nueva solicitud de intercambio', authorization);
        return createdExchange;
    }
    async deleteExchange(exchangeId: string): Promise<void> {
        await this.exchangeCommand.deleteExchange(exchangeId);
    }
    async changeState(updateStateRequest: UpdateStateRequest, authorization: string): Promise<IExchangeDocument> {
        const updatedStateExchange: IExchangeDocument = await this.exchangeCommand.changeState(updateStateRequest);
        if (updateStateRequest.state = 'ongoing') {
            const createChatRequest = new CreateChatRequest(updatedStateExchange.senderUserId, updatedStateExchange.receiverUserId);
            const chatId = await this.chatClient.createChat(createChatRequest);
            this.createNotification(updatedStateExchange.senderUserId, {chatId: chatId} ,'Solicitud aceptada', authorization);
        }
        else
        {
            this.createNotification(updatedStateExchange.senderUserId, {} ,'Solicitud rechazada', authorization);
        }
        return updatedStateExchange;
    }
    async getExchangeById(exchangeId: string): Promise<IExchangeDocument> {
        const retrievedExchange: IExchangeDocument = await this.exchangeQuery.getExchangeById(exchangeId);
        return retrievedExchange;
    }
    async getExchangeByUserId(userId: string): Promise<Array<IExchangeDocument>> {
        const retrievedUsers: Array<IExchangeDocument> | null = await this.exchangeQuery.getExchangeByUserId(userId);
        return retrievedUsers;
    }
    async getExchangeByClotheId(clotheId: string): Promise<IExchangeDocument> {
        const retrievedClothe: IExchangeDocument = await this.exchangeQuery.getExchangeByClotheId(clotheId);
        return retrievedClothe;
    }
    createNotification(receiverUserId: string, obj: Object, msg: string, authorization: string) {
        const createdNotification = new CreateNotificationRequest(receiverUserId, obj, msg, 'exchange');
        this.notificationClient.createNotification(createdNotification, authorization)
    }
}
export default ExchangeServices;
