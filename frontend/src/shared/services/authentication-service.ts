import {
  AuthenticationRepo,
  ICreateUser,
  ILoginUser,
} from "@/shared/repositories/authentication-repo";
import { User } from "@/shared/factories/user-factory";
import { AuthenticationModel } from "@/shared/models/authentication-model";

export class AuthenticationService implements AuthenticationModel {
  private _repository: AuthenticationRepo;

  constructor() {
    this._repository = new AuthenticationRepo();

    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  async createUser(data: ICreateUser): Promise<string> {
    const id = await this._repository.createNewUser(data);
    return id;
  }

  async loginUser(data: ILoginUser): Promise<User> {
    const user = await this._repository.loginUser(data);
    return new User(user);
  }
}
