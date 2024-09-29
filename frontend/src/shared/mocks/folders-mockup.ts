import { Folder } from "../factories/folders-factory";
import { IFolderResponse } from "../repositories/folder-repo";
import { faker } from "@faker-js/faker";

export function createFolderMockup(): Folder {
  const mockup = {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    user_id: faker.number.int(),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent({
      days: 30
    }).toISOString(),
  } as IFolderResponse;

  return new Folder(mockup);
}

export function generateFoldersMockup(amount: number): Folder[] {
  return Array.from({ length: amount }, () => createFolderMockup());
}
