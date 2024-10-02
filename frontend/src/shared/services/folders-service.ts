import { Folder } from "../factories/folders-factory";
import {
  FoldersRepo,
  ICreateFolderRequest,
} from "../repositories/folders-repo";

export class FoldersService {
  private _repository: FoldersRepo;

  constructor() {
    this._repository = new FoldersRepo();

    this.list = this.list.bind(this);
    this.create = this.create.bind(this);
  }

  async list(): Promise<Folder[]> {
    const response = await this._repository.getFolders();
    const folders = response.map((folder) => new Folder(folder));

    return folders;
  }

  async create(data: ICreateFolderRequest): Promise<Folder> {
    const response = await this._repository.createFolder(data);
    return new Folder(response);
  }
}
