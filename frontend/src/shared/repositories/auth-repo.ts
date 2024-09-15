import axios from "axios";

export interface IAuthResponse {
  user_id: string;
  email: string;
  token: string;

  created_at: string;
  updated_at: string;
}

export interface ISignUpRequest {
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export class AuthRepo {
  private _API_URL = "http://localhost:3000/api";

  async signup(data: ISignUpRequest): Promise<void> {
    const endpoint = `${this._API_URL}/signup`;

    await axios.post<string>(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  async login(data: ILoginUser): Promise<IAuthResponse> {
    const endpoint = `${this._API_URL}/login`;

    const response = await axios.post<IAuthResponse>(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  }

  async forgot(email: string): Promise<void> {
    const endpoint = `${this._API_URL}/forgot`;

    await axios.post<void>(endpoint, {
      email,
    });
  }

  async logout(): Promise<void> {
    const endpoint = `${this._API_URL}/logout`;
    const cookie = document.cookie;
    const user = cookie.split("=")[1];

    await axios.post<void>(endpoint, undefined, {
      headers: {
        "Content-Type": "application/json",
        Authorization: user,
      },
      withCredentials: true,
    });
  }
}
