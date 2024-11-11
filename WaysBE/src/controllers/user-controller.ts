import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user-service";
import { UpdateProfileDTO } from "../dto/profile-dto";
import { prisma } from "../libs/prisma";

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = res.locals.user.id;
    const data: UpdateProfileDTO = req.body;

    const user = await userService.updateServices(
      id,
      data,
      req.file as Express.Multer.File
    );
    res.json(user);
  } catch (error) {
    console.log(error);
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getUserTransactionItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id;

    const userWithTransactionItems = await userService.getUserTransactionItems(
      userId
    );

    if (!userWithTransactionItems) {
      return res
        .status(404)
        .json({ message: "User or transactions not found" });
    }

    res.json(userWithTransactionItems);
  } catch (error) {
    console.error("Error fetching transaction items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserTransactionItemsAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userWithTransactionItems =
      await userService.getUserTransactionItemsAdmin();

    if (!userWithTransactionItems) {
      return res
        .status(404)
        .json({ message: "User or transactions not found" });
    }

    res.json(userWithTransactionItems);
  } catch (error) {
    console.error("Error fetching transaction items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
