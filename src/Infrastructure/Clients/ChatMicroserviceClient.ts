import axios, { AxiosResponse } from 'axios';
import CreateChatRequest from './Requests/CreateChatRequest';


class ChatMicroserviceClient{
    
    async createChat (createChatRequest: CreateChatRequest) : Promise<AxiosResponse>{
        try {
            const response = await axios.post(`https://microservicio-chats.onrender.com/api/chat`, createChatRequest);
                return response;
        } catch (err:any){            
            throw new Error(err)
        }
    }
}
export default ChatMicroserviceClient;