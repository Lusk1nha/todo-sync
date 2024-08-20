import axios from "axios";

export interface IUserResponse {
  user_id: string;
  username: string;
  email: string;
  token: string;

  created_at: string;
  updated_at: string;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export class UsersRepo {
  private _API_URL = "http://localhost:8080/api";

  async createNewUser(data: ICreateUser): Promise<string> {
    const endpoint = `${this._API_URL}/users`;

    const response = await axios.post<string>(endpoint, data);

    return response.data;
  }

  async loginUser(data: ILoginUser): Promise<IUserResponse> {
    const endpoint = `${this._API_URL}/login`;

    const response = await axios.post<IUserResponse>(endpoint, data);

    return response.data;
  }
}
