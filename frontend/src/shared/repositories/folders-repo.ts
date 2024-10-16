import axios from "axios";
import { getTokenAuthorization } from "../helpers/cookies-helper";
import { IFolderColumnsResponse } from "./folder-columns-repo";

export interface IFolderResponse {
  id: string;
  name: string;
  description: string | null | undefined;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface ICreateFolderRequest {
  name: string;
  description: string;
}

export class FoldersRepo {
  private readonly _API_URL = "http://localhost:3000/api/folders";

  async getFolderById(folderId: string): Promise<IFolderResponse> {
    const endpoint = `${this._API_URL}/${folderId}`;

    const response = await axios.get<IFolderResponse>(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenAuthorization(),
      },
      withCredentials: true,
    });

    return response.data;
  }

  async getFolders(): Promise<IFolderResponse[]> {
    const endpoint = `${this._API_URL}`;

    const response = await axios.get<IFolderResponse[]>(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenAuthorization(),
      },
      withCredentials: true,
    });

    return response.data;
  }

  async getColumns(folderId: string): Promise<IFolderColumnsResponse[]> {
    const endpoint = `${this._API_URL}/${folderId}/columns`;

    const response = await axios.get<IFolderColumnsResponse[]>(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenAuthorization(),
      },
      withCredentials: true,
    });

    return response.data;
  }

  async createFolder(payload: ICreateFolderRequest): Promise<IFolderResponse> {
    const endpoint = `${this._API_URL}/new`;

    const response = await axios.post<IFolderResponse>(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenAuthorization(),
      },
      withCredentials: true,
    });

    return response.data;
  }
}
