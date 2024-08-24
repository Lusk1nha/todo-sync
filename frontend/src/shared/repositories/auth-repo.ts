import axios from "axios";

export interface IUserResponse {
  user_id: string;
  username: string;
  email: string;
  token: string;

  created_at: string;
  updated_at: string;
}

export interface ISignUpRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export class AuthRepo {
  private _API_URL = "http://localhost:8080/api/auth";

  async signup(data: ISignUpRequest): Promise<void> {
    const endpoint = `${this._API_URL}/signup`;

    await axios.post<string>(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async login(data: ILoginUser): Promise<IUserResponse> {
    const endpoint = `${this._API_URL}/login`;

    const response = await axios.post<IUserResponse>(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  }
}
