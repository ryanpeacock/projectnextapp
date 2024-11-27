import type { StaticImageData } from "next/image";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
};

export type UserFormData = Omit<User, "id">;

export type UsersArray = User[];

export type imageList = {
  src: StaticImageData;
  alt: string;
};

export type RandomUser = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string; // Postcode can sometimes be a string
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string; // ISO date string
    age: number;
  };
  registered: {
    date: string; // ISO date string
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string | null;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};
