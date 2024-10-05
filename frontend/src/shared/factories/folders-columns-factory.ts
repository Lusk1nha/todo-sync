import { IFolderColumnsResponse } from "../repositories/folder-columns-repo";

export class FolderColumn {
  private readonly _id: string;
  private readonly _folder_id: string;
  private readonly _name: string;
  private readonly _position: number;
  private readonly _created_at: string;
  private readonly _updated_at: string;

  constructor(data: IFolderColumnsResponse) {
    this._id = data.id;
    this._folder_id = data.folder_id;
    this._name = data.name;
    this._position = data.position;
    this._created_at = data.created_at;
    this._updated_at = data.updated_at;
  }

  get id(): string {
    return this._id;
  }

  get folder_id(): string {
    return this._folder_id;
  }

  get name(): string {
    return this._name;
  }

  get position(): number {
    return this._position;
  }

  get created_at(): string {
    return this._created_at;
  }

  get updated_at(): string {
    return this._updated_at;
  }
}
