import * as authService from "../services/auth-service";
import * as profileService from "../services/user-service";
import { NextFunction, Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "../dto/auth-dto";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataUserForLogin = req.body as LoginDTO;
    const token = await authService.login(dataUserForLogin);
    res.status(200).json(token);
  } catch (error) {
    console.log(error);

    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataUserForRegister = req.body as RegisterDTO;
    const createdUser = await authService.register(dataUserForRegister);
    res.status(200).json(createdUser);
  } catch (error) {
    console.log(error);

    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    const profile = await profileService.getUser(user.email);

    res.json(profile);
  } catch (error) {
    console.log(error);

    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
