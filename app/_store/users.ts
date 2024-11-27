import { atom } from "jotai";
import { User, UserFormData } from "../_types/users";

export const usersAtom = atom<User[]>([]);

export const selectedUserAtom = atom<User | null>(null);

export const initialUserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  avatar: "",
};

export const userFormAtom = atom<UserFormData>({
  ...initialUserFormData,
});

export const dialogVisable = atom<boolean>(false);

export const formErrorsAtom = atom<Record<string, string>>({});

export const selectedPicAtom = atom<string>("");
