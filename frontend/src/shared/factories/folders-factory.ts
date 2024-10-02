import { IFolderResponse } from "../repositories/folder-repo";

export class Folder {
  private _id: string;
  private _name: string;
  private _description: string | null | undefined;
  private _color: string | null | undefined;
  private _user_id: number;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(data: IFolderResponse) {
    if (!data.id) {
      throw new Error("Folder ID is required");
    }

    if (!this.validHexColor(data.color)) {
      throw new Error("Invalid color format");
    }

    this._id = data.id;
    this._name = data.name;
    this._description = data?.description;
    this._color = data?.color;
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

  get description(): string | null | undefined {
    return this?._description;
  }

  get color(): string | null | undefined {
    return this._color;
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

  private validHexColor(hex: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(hex);
  }
}
