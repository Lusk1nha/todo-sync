import { UserProfile } from "../factories/user-profile-factory";
import { IUpdateSettings } from "../repositories/users-profiles-repo";

export abstract class UsersProfilesModel {
  abstract getCurrentUser(): Promise<UserProfile | null>;
  abstract create(data: IUpdateSettings): Promise<void>;
  abstract update(id: string, data: IUpdateSettings): Promise<void>;
}
