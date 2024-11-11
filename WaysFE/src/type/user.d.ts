export interface IUser {
  id: number;
  email: string;
  name: string;
  avatar: string;
  gender: string;
  phone: string;
  address: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  transaction: ITransaction[];
}

export interface IUpdateProfileDTO {
  name?: string;
  email?: string;
  avatar?: File;
  gender?: string;
  phone?: string;
  address?: string;
}
