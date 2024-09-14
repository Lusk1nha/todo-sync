import { IUpdateSettings } from "../repositories/users-repo";

export abstract class UsersModel {
  abstract update(data: IUpdateSettings): Promise<void>;
}
