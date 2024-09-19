import axios from "axios";
import { getTokenAuthorization } from "../helpers/cookies-helper";

export interface IUserProfileResponse {
  user_id: string;
  username: string;
  date_of_birth: string;
  profile_picture_url?: string;

  created_at: string;
  updated_at: string;
}

export interface IUpdateSettings {
  username: string;
  date_of_birth?: string;
  profile_picture_url?: string;
}

export class UsersProfilesRepo {
  private _API_URL = "http://localhost:3000/api/users";

  async getCurrentUserProfile(): Promise<IUserProfileResponse> {
    const endpoint = `${this._API_URL}/current-user`;

    const response = await axios.get<IUserProfileResponse>(endpoint, {
      withCredentials: true,
      headers: {
        Authorization: getTokenAuthorization(),
      },
    });

    return response.data;
  }

  async updateUserSettings(data: IUpdateSettings): Promise<void> {
    const endpoint = `${this._API_URL}/settings`;

    await axios.patch<string>(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenAuthorization(),
      },
      withCredentials: true,
    });
  }
}
