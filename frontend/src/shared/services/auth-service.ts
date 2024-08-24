import {
  AuthRepo,
  ISignUpRequest,
  ILoginUser,
} from "@/shared/repositories/auth-repo";
import { User } from "@/shared/factories/user-factory";
import { AuthModel } from "@/shared/models/auth-model";

export class AuthService implements AuthModel {
  private _repository: AuthRepo;

  constructor() {
    this._repository = new AuthRepo();

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async signup(data: ISignUpRequest): Promise<void> {
    await this._repository.signup(data);
  }

  async login(data: ILoginUser): Promise<User> {
    const user = await this._repository.login(data);
    return new User(user);
  }
}
