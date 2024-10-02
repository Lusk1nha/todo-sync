import axios from "axios";

export interface IFolderResponse {
  id: string;
  name: string;
  description: string | null | undefined;
  color: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export class FolderRepo {
  private _API_URL = "http://localhost:3000/api";

  async getFolders(): Promise<IFolderResponse[]> {
    const endpoint = `${this._API_URL}/folders`;

    const response = await axios.get<IFolderResponse[]>(endpoint, {
      withCredentials: true,
    });

    return response.data;
  }
}
