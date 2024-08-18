import { User } from "../factories/user-factory";
import { ICreateUser, ILoginUser } from "../repositories/authentication-repo";

export abstract class AuthenticationModel {
  abstract createUser(data: ICreateUser): Promise<string>;
  abstract loginUser(data: ILoginUser): Promise<User>;
}
