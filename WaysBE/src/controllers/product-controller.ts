import { Request, Response } from "express";
import { ProductDTO } from "../dto/product-dto";
import * as productService from "../services/product-service";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, stock, userId } = req.body;

    if (
      !name ||
      typeof price !== "string" ||
      typeof description !== "string" ||
      typeof stock !== "string" ||
      typeof userId !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "All fields must be provided and valid." });
    }

    const parsedPrice = parseInt(price, 10);
    const parsedStock = parseInt(stock, 10);
    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedPrice) || isNaN(parsedStock) || isNaN(parsedUserId)) {
      return res
        .status(400)
        .json({ error: "Some fields must be valid integers." });
    }

    const newProduct: ProductDTO = {
      name,
      price: parsedPrice,
      description,
      image,
      stock: parsedStock,
      userId: parsedUserId,
    };

    const productData = newProduct as ProductDTO;
    const file = req.file as Express.Multer.File;

    const product = await productService.createProduct(productData, file);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const { name, price, description, categoryId, stock } = req.body;

    if (name !== undefined && typeof name !== "string") {
      return res.status(400).json({ error: "Name must be a string." });
    }

    if (price !== undefined && typeof price !== "string") {
      return res.status(400).json({ error: "Price must be a string." });
    }

    if (categoryId !== undefined && typeof categoryId !== "string") {
      return res.status(400).json({ error: "Category ID must be a string." });
    }

    if (stock !== undefined && typeof stock !== "string") {
      return res.status(400).json({ error: "Stock must be a string." });
    }

    const updatedData: Partial<ProductDTO> = {};

    if (name) updatedData.name = name;
    if (price) updatedData.price = parseInt(price, 10);
    if (description) updatedData.description = description;
    if (stock) updatedData.stock = parseInt(stock, 10);

    const file = req.file as Express.Multer.File;

    const updatedProduct = await productService.updateProduct(
      productId,
      updatedData,
      file
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
