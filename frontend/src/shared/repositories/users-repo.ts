import axios from "axios";

export interface IUserResponse {
  user_id: string;
  username: string;
  birthday: string;
  email: string;

  created_at: string;
  updated_at: string;
}

export interface IUpdateSettings {
  username: string;
  birthday: string;
}

export class UsersRepo {
  private _API_URL = "http://localhost:8080/api/users";

  async updateUserSettings(data: IUpdateSettings): Promise<void> {
    const endpoint = `${this._API_URL}/settings`;

    await axios.patch<string>(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }
}
