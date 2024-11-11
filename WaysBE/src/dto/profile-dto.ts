import { GenderEnum } from "@prisma/client";

export interface UpdateProfileDTO {
  name?: string;
  email?: string;
  avatar?: string;
  gender?: GenderEnum;
  phone?: string;
  address?: string;
}
