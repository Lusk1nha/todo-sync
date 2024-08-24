import { User } from "../factories/user-factory";
import { ISignUpRequest, ILoginUser } from "../repositories/auth-repo";

export abstract class AuthModel {
  abstract signup(data: ISignUpRequest): Promise<void>;
  abstract login(data: ILoginUser): Promise<User>;
}
