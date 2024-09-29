import { IFolderResponse } from "../repositories/folder-repo";

export class Folder {
  private _id: string;
  private _name: string;
  private _user_id: number;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(data: IFolderResponse) {
    this._id = data.id;
    this._name = data.name;
    this._user_id = data.user_id;
    this._created_at = new Date(data.created_at);
    this._updated_at = new Date(data.updated_at);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get user_id(): number {
    return this._user_id;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }
}
