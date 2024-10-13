import { FolderColumn } from "../factories/folders-columns-factory";
import { FoldersColumnsModel } from "../models/folders-columns-model";
import {
  FolderColumnsRepo,
  ICreateFolderColumnRequest,
} from "../repositories/folder-columns-repo";

export class FolderColumnsService implements FoldersColumnsModel {
  private readonly _repository: FolderColumnsRepo;

  constructor() {
    this._repository = new FolderColumnsRepo();

    this.create = this.create.bind(this);
  }

  async create(payload: ICreateFolderColumnRequest): Promise<FolderColumn> {
    const response = await this._repository.createFolderColumn(payload);
    return new FolderColumn(response);
  }
}
