import { LoginDTO, RegisterDTO } from "../dto/auth-dto";
import { prisma } from "../libs/prisma";
import * as userRepo from "../repositories/user-repo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (login: LoginDTO) => {
  const user = await userRepo.findUserByEmail(login.email);
  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(login.password, user.password);
  if (!isValidPassword) {
    throw new Error("User not found");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  const { password, ...userLogin } = user;

  return { token: token, user: userLogin };
};

export const register = async (regist: RegisterDTO) => {
  const existedUser = await userRepo.findUserByEmail(regist.email);
  if (existedUser) {
    throw new Error("Email already exists");
  }

  const hashPassword = await bcrypt.hash(regist.password, 10);
  const generateName = regist.email.split("@")[0];

  const createdUser = await userRepo.createUser({
    ...regist,
    name: generateName,
    password: hashPassword,
  });

  return createdUser;
};
