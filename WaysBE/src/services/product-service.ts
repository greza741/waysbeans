import { ProductDTO } from "../dto/product-dto";
import uploader from "../libs/cloudinary";
import { prisma } from "../libs/prisma";

export const createProduct = async (
  data: ProductDTO,
  file?: Express.Multer.File
) => {
  try {
    if (file) {
      const urls = await uploader(file);
      data.image = urls.secure_url;
    }

    return await prisma.product.create({ data });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create product");
  }
};

export const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

export const updateProduct = async (
  id: number,
  data: Partial<ProductDTO>,
  file?: Express.Multer.File
) => {
  try {
    if (file) {
      const urls = await uploader(file);
      data.image = urls.secure_url;
    }
    return await prisma.product.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Update error:", error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};
