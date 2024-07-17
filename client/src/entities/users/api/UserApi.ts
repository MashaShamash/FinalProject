import { AxiosResponse } from "axios";
import { User } from "../../auth/types/userTypes";
import axiosInstance from "../../../services/axiosInstance";







class UserApi {
    static getAllUser = async (): Promise<User[]> => {
        try {
          const response: AxiosResponse<{ message: 'success'; userses: User[] }> =
            await axiosInstance.get('auth/users');
          return response.data.userses;
        } catch (error) {
          throw new Error('Ошибка на запросе');
        }
      };
}

export default UserApi