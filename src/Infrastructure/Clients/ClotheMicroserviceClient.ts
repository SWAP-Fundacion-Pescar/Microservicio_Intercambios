import axios, { AxiosResponse } from 'axios';
import NotFoundException from '../../Application/Exceptions/NotFoundException';


class ClotheMicroserviceClient{
    
    async getClotheById (clotheId:string) : Promise<AxiosResponse>{
        try {
            const response = await axios.get(`http://localhost:3001/api/clothes/${clotheId}`);
                return response;
        } catch (err:any){
            if (err.response.status == 404) {
                throw new NotFoundException('La prenda no se encontró.')
            }
            throw new Error(err)
        }
    }
}
export default ClotheMicroserviceClient;