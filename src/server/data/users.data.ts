import { data, User } from "./store";

export const getUserById = (id: number) => {
  return data.Users.find((user) => user.id === id);
};

export const getUserByEmail = (email: string) => {
  return data.Users.find((user) => user.email === email);
};

export const createUser = (user: Omit<User, "id">) => {
  const newUser = {
    id: data.Users.length + 1,
    ...user,
  };

  data.Users.push(newUser);
};
