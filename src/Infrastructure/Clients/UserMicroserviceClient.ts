import axios, { AxiosResponse } from 'axios';
import NotFoundException from '../../Application/Exceptions/NotFoundException';

class UserMicroserviceClient{
    async getUserById (userId:string) : Promise<AxiosResponse>{
        try {
            const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
                return response;
        } catch (err:any){
            if (err.response.status == 404) {
                throw new NotFoundException('El usuario no se encontró.')
            }
            throw new Error(err)
        }
    }
}
export default UserMicroserviceClient;