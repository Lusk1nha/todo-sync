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

export class AuthenticationRepo {
  private _API_URL = "http://localhost:8080/users";

  async createNewUser(data: ICreateUser): Promise<string> {
    const response = await axios.post<string>(this._API_URL, data);

    return response.data;
  }

  async loginUser(data: ILoginUser): Promise<IUserResponse> {
    const response = await axios.post<IUserResponse>(
      `${this._API_URL}/login`,
      data
    );

    return response.data;
  }
}
