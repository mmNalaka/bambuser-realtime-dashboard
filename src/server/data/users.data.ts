import { data, User } from "./store";

export const getUserById = (id: number) => {
  return data.Users.find((user) => user.id === id);
};

export const getUserByEmail = (email: string) => {
  return data.Users.find((user) => user.email === email);
};

export const createUser = (user: Pick<User, "email" | "password">) => {
  const newUser = {
    id: data.Users.length + 1,
    name: "",
    ...user,
  };

  data.Users.push(newUser);
  return newUser;
};
