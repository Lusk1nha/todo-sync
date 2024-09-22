import { atom } from "jotai";
import { UserProfile } from "./factories/user-profile-factory";

export const profileAtom = atom<UserProfile | null>(null);
