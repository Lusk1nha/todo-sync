import { UsersModel } from "../models/users-model";
import { IUpdateSettings, UsersRepo } from "../repositories/users-repo";

export class UsersService implements UsersModel {
  private _repository: UsersRepo;

  constructor() {
    this._repository = new UsersRepo();
    this.update = this.update.bind(this);
  }

  async update(data: IUpdateSettings): Promise<void> {
    await this._repository.updateUserSettings(data);
  }
}
