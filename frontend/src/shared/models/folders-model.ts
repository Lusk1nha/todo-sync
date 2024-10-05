import { FolderColumn } from "../factories/folders-columns-factory";
import { Folder } from "../factories/folders-factory";
import { ICreateFolderRequest } from "../repositories/folders-repo";

export abstract class FoldersModel {
  abstract get(folderId: string): Promise<Folder>;
  abstract list(): Promise<Folder[]>;
  abstract columns(folderId: string): Promise<FolderColumn[]>;
  abstract create(data: ICreateFolderRequest): Promise<Folder>;
}
