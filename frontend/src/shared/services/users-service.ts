import {
  UsersRepo,
  ICreateUser,
  ILoginUser,
} from "@/shared/repositories/users-repo";
import { User } from "@/shared/factories/user-factory";
import { UsersModel } from "@/shared/models/users-model";

export class UsersService implements UsersModel {
  private _repository: UsersRepo;

  constructor() {
    this._repository = new UsersRepo();

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
