import { Folder } from "../factories/folders-factory";
import { ICreateFolderRequest } from "../repositories/folders-repo";

export abstract class FoldersModel {
  abstract list(): Promise<Folder[]>;
  abstract create(data: ICreateFolderRequest): Promise<void>;
}
