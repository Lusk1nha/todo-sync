import { UserProfile } from "../factories/user-profile-factory";
import { UsersProfilesModel } from "../models/users-profiles-model";
import {
  IUpdateSettings,
  UsersProfilesRepo,
} from "../repositories/users-profiles-repo";

export class UsersProfilesService implements UsersProfilesModel {
  private _repository: UsersProfilesRepo;

  constructor() {
    this._repository = new UsersProfilesRepo();

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.update = this.update.bind(this);
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    const data = await this._repository.getCurrentUserProfile();

    if (!data) {
      return null;
    }

    return new UserProfile(data);
  }

  async update(data: IUpdateSettings): Promise<void> {
    await this._repository.updateUserSettings(data);
  }
}
