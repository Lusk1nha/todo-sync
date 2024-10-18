import { FolderColumn } from "../factories/folders-columns-factory";
import { Folder } from "../factories/folders-factory";
import { generateNumberBetween } from "../helpers/mockup-helper";
import { IFolderColumnsResponse } from "../repositories/folder-columns-repo";
import { IFolderResponse } from "../repositories/folders-repo";
import { faker } from "@faker-js/faker";

export function createFolderMockup(): Folder {
  const mockup = {
    id: faker.string.uuid(),
    name: faker.lorem.paragraph(),
    description: faker.lorem.paragraphs(),
    color: faker.internet.color(),
    user_id: faker.number.int(),
    created_at: faker.date.recent().toISOString(),

    updated_at: faker.date
      .recent({
        days: 30,
      })
      .toISOString(),
  } as IFolderResponse;

  const folder = new Folder(mockup);
  folder.defineColumns(
    generateFolderColumnsMockup(generateNumberBetween(1, 10))
  );

  return folder;
}

export function generateFoldersMockup(amount: number): Folder[] {
  return Array.from({ length: amount }, () => createFolderMockup());
}

export function createFolderColumn(): FolderColumn {
  const mockup = {
    id: faker.string.uuid(),
    name: faker.lorem.paragraph(),
    color: faker.internet.color(),
    folder_id: faker.string.uuid(),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date
      .recent({
        days: 30,
      })
      .toISOString(),
  } as IFolderColumnsResponse;

  return new FolderColumn(mockup);
}

export function generateFolderColumnsMockup(amount: number): FolderColumn[] {
  return Array.from({ length: amount }, () => createFolderColumn());
}
