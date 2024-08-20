import { User } from "../factories/user-factory";
import { ICreateUser, ILoginUser } from "../repositories/users-repo";

export abstract class UsersModel {
  abstract createUser(data: ICreateUser): Promise<string>;
  abstract loginUser(data: ILoginUser): Promise<User>;
}
