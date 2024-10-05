import { FolderColumn } from "../factories/folders-columns-factory";
import { ICreateFolderColumnRequest } from "../repositories/folder-columns-repo";

export abstract class FoldersColumnsModel {
  abstract create(data: ICreateFolderColumnRequest): Promise<FolderColumn>;
}
