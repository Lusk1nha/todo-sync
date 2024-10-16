import { IAuthResponse } from "../repositories/auth-repo";

export class Auth {
  private readonly user_id: string;
  private readonly _token: string;
  private readonly _expiresIn: number;

  constructor(data: IAuthResponse) {
    this.user_id = data.user_id;
    this._token = data.token;
    this._expiresIn = 0;
  }

  get userId(): string {
    return this.user_id;
  }

  get token(): string {
    return this._token;
  }

  get expiresIn(): number {
    return this._expiresIn;
  }
}
