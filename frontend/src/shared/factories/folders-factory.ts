import { IFolderResponse } from "../repositories/folders-repo";

export class Folder {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string | null | undefined;

  private readonly _user_id: number;
  private readonly _created_at: Date;
  private readonly _updated_at: Date;

  constructor(data: IFolderResponse) {
    if (!data.id) {
      throw new Error("Folder ID is required");
    }

    this._id = data.id;
    this._name = data.name;
    this._description = data?.description;

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
