import { FolderColumn } from "../factories/folders-columns-factory";
import { Folder } from "../factories/folders-factory";
import { FoldersModel } from "../models/folders-model";
import {
  FoldersRepo,
  ICreateFolderRequest,
} from "../repositories/folders-repo";

export class FoldersService implements FoldersModel {
  private readonly _repository: FoldersRepo;

  constructor() {
    this._repository = new FoldersRepo();

    this.list = this.list.bind(this);
    this.get = this.get.bind(this);
    this.columns = this.columns.bind(this);
    this.create = this.create.bind(this);
  }

  async get(folderId: string): Promise<Folder> {
    const response = await this._repository.getFolderById(folderId);
    return new Folder(response);
  }

  async columns(folderId: string): Promise<FolderColumn[]> {
    const response = await this._repository.getColumns(folderId);
    const folderColumns = response.map(
      (folderColumn) => new FolderColumn(folderColumn)
    );

    return folderColumns;
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
