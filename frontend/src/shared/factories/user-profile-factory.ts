import { IUserProfileResponse } from "../repositories/users-profiles-repo";

export class UserProfile {
  private _user_id: string;
  private _username: string;

  private _birthday: Date | null;
  private _profile_picture_url?: string;

  private _created_at: Date;
  private _updated_at: Date;

  constructor(data: IUserProfileResponse) {
    this._user_id = data.user_id;
    this._username = data.username;

    this._birthday = data?.date_of_birth ? new Date(data.date_of_birth) : null;
    this._profile_picture_url = data?.profile_picture_url;

    this._created_at = new Date(data.created_at);
    this._updated_at = new Date(data.updated_at);
  }

  get user_id(): string {
    return this._user_id;
  }

  get username(): string {
    return this._username;
  }

  get birthday(): Date | null {
    return this._birthday;
  }

  get profile_picture_url(): string | undefined {
    return this._profile_picture_url;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }
}
