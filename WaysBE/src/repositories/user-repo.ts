import { RegisterDTO } from "../dto/auth-dto";
import { UpdateProfileDTO } from "../dto/profile-dto";
import { prisma } from "../libs/prisma";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (regist: RegisterDTO) => {
  return await prisma.user.create({
    data: {
      ...regist,
    },
  });
};

// export const updateUser = async (
//   id: number,
//   update: Partial<UpdateProfileDTO>
// ) => {
//   return await prisma.user.update({
//     where: { id },
//     data: {
//       ...update,
//     },
//   });
// };

export const findUser = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      gender: true,
      phone: true,
      address: true,
      role: true,
    },
  });
};
