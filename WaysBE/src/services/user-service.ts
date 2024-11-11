import { UpdateProfileDTO } from "../dto/profile-dto";
import uploader from "../libs/cloudinary";
import { prisma } from "../libs/prisma";
import * as userRepo from "../repositories/user-repo";

export const getUser = async (email: string) => {
  return userRepo.findUser(email);
};

export const updateServices = async (
  id: number,
  update: UpdateProfileDTO,
  file?: Express.Multer.File
) => {
  let updateData: Partial<UpdateProfileDTO> = { ...update };

  if (file) {
    const urls = await uploader(file);
    updateData.avatar = urls.secure_url;
  }
  const updateUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });
  const { password, ...dataUser } = updateUser;
  return dataUser;
};

export const getUserTransactionItems = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      transaction: {
        include: {
          TransactionItem: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
};

export const getUserTransactionItemsAdmin = async () => {
  return await prisma.user.findMany({
    where: {
      transaction: {
        some: {},
      },
    },
    include: {
      transaction: {
        include: {
          TransactionItem: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
};
