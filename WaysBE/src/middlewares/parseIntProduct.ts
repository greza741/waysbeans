import { Request, Response, NextFunction } from "express";

export const parseIntegers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fieldsToParse = ["price", "categoryId", "stock", "userId"];

  fieldsToParse.forEach((field) => {
    if (req.body[field]) {
      req.body[field] = parseInt(req.body[field], 10);

      // Validasi jika parsing gagal
      if (isNaN(req.body[field])) {
        return res
          .status(400)
          .json({ error: `${field} must be a valid integer.` });
      }
    }
  });
  next();
};
