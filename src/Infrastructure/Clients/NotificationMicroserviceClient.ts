import axios, { AxiosResponse } from 'axios';
import CreateNotificationRequest from './Requests/CreateNotificationRequest';
class NotificationClientMicroservice {

    async createNotification(notificationRequest: CreateNotificationRequest, authorization: string): Promise<AxiosResponse> {        
        const headers =
        {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
        const response = await axios.post(`https://microservicio-notificaciones.onrender.com/api/notification`, notificationRequest,
            {
                headers: headers
            });
        return response;
    }
}
export default NotificationClientMicroservice;