import { UserProfile } from "../factories/user-profile-factory";
import { IUpdateSettings } from "../repositories/users-profiles-repo";

export abstract class UsersProfilesModel {
  abstract getCurrentUser(): Promise<UserProfile | null>;
  abstract update(data: IUpdateSettings): Promise<void>;
}
