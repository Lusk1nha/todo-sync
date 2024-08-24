import { IUserResponse } from "../repositories/auth-repo";

export class User {
  private _user_id: string;
  private _username: string;
  private _email: string;
  private _token: string;

  private _created_at: Date;
  private _updated_at: Date;

  constructor(data: IUserResponse) {
    this._user_id = data.user_id;
    this._username = data.username;
    this._email = data.email;
    this._token = data.token;

    this._created_at = new Date(data.created_at);
    this._updated_at = new Date(data.updated_at);
  }

  get user_id(): string {
    return this._user_id;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get token(): string {
    return this._token;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }
}
