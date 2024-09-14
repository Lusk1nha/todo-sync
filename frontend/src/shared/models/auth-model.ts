import { Auth } from "../factories/auth-factory";
import { ISignUpRequest, ILoginUser } from "../repositories/auth-repo";

export abstract class AuthModel {
  abstract signup(data: ISignUpRequest): Promise<void>;
  abstract login(data: ILoginUser): Promise<Auth>;
  abstract forgot(email: string): Promise<void>;
  abstract logout(): void;
}
