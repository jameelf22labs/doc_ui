import { faker } from "@faker-js/faker";
import type { User } from "./types";

export const generateRandomUser = (): User => {
  return {
    userName: faker.internet.userName(),
    picture: faker.image.avatar(),
  };
};

export const getUser = (): User => {
  const user = localStorage.getItem("user");

  if (!user) {
    const newUser = generateRandomUser();
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  }

  return JSON.parse(user) as User;
};
