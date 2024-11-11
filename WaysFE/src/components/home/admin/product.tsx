import { useAppDispatch, useAppSelector } from "@/stores";
import {
  createProductAsync,
  getAllProductsAsync,
} from "@/stores/product/async";
import { Product } from "@/stores/product/slice";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CreateProductModal from "./add-product-modal";
import { ProductTable } from "./product-table";

export function ProductAdmin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const products: Product[] = useAppSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  const handleCreateProduct = async (productData: FormData) => {
    await dispatch(createProductAsync(productData));
    onClose();
  };

  return (
    <Box>
      <Box
        margin={"50px 0px 0px 50px"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text>List Product</Text>
        <Button onClick={onOpen} mr={10}>
          Add Product
        </Button>
        <CreateProductModal
          isOpen={isOpen}
          onClose={onClose}
          initialRef={initialRef}
          finalRef={finalRef}
          onCreate={handleCreateProduct}
        />
      </Box>
      <Box>
        <ProductTable products={products} />
      </Box>
    </Box>
  );
}
