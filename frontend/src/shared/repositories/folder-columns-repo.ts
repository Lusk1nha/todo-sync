import axios from "axios";
import { getTokenAuthorization } from "../helpers/cookies-helper";

export interface IFolderColumnsResponse {
  id: string;
  folder_id: string;
  name: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface ICreateFolderColumnRequest {
  folder_id: string;
  name: string;
  position: number;
}

export class FolderColumnsRepo {
  private readonly _API_URL = "http://localhost:3000/api/folders-columns";

  async createFolderColumn(
    payload: ICreateFolderColumnRequest
  ): Promise<IFolderColumnsResponse> {
    const endpoint = `${this._API_URL}/new`;

    const response = await axios.post<IFolderColumnsResponse>(
      endpoint,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenAuthorization(),
        },
        withCredentials: true,
      }
    );

    return response.data;
  }
}
