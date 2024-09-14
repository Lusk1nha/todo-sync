import {
  AuthRepo,
  ISignUpRequest,
  ILoginUser,
} from "@/shared/repositories/auth-repo";

import { AuthModel } from "@/shared/models/auth-model";
import { Auth } from "../factories/auth-factory";

export class AuthService implements AuthModel {
  private _repository: AuthRepo;

  constructor() {
    this._repository = new AuthRepo();

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.forgot = this.forgot.bind(this);
  }

  async signup(data: ISignUpRequest): Promise<void> {
    await this._repository.signup(data);
  }

  async login(data: ILoginUser): Promise<Auth> {
    const email = data.email;
    const password = data.password;

    const user = await this._repository.login({
      email,
      password,
    });

    return new Auth(user);
  }

  async forgot(email: string): Promise<void> {
    await this._repository.forgot(email);
  }

  async logout(): Promise<void> {
    await this._repository.logout();
  }
}
