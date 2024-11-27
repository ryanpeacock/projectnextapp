import { RandomUser } from "@/app/_types/users";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatUserDataFromServer = (data: RandomUser[]) => {
  const newUserData = data.map((item: RandomUser) => {
    return {
      id: item.login.uuid,
      firstName: item.name.first,
      lastName: item.name.last,
      email: item.email,
      phoneNumber: item.cell,
      avatar: item.picture.medium,
    };
  });

  return newUserData;
};
