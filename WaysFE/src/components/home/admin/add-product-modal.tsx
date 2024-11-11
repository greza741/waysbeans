import { useAppDispatch, useAppSelector } from "@/stores";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  finalRef: React.RefObject<HTMLButtonElement>;
  onCreate: (productData: FormData) => Promise<void>;
}

const CreateProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  initialRef,
  finalRef,
  onCreate,
}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
    userId: auth.user?.id,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("userId", `${productData.userId}`);
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      console.error("No image file found!");
    }
    await onCreate(formData);
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={"7xl"}
    >
      <ModalOverlay />
      <ModalContent
        bgColor={"brand.background"}
        h={"90%"}
        p={"20px"}
        color={"brand.coklat"}
      >
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Flex alignItems={"center"} gap={5}>
              <Box w={"50%"}>
                <FormControl mb={2}>
                  <Input
                    bg={"brand.input"}
                    border={"2px solid #603C2B"}
                    name="name"
                    onChange={handleChange}
                    ref={initialRef}
                    placeholder="Product"
                  />
                </FormControl>
                <FormControl mb={2}>
                  <Input
                    bg={"brand.input"}
                    border={"2px solid #603C2B"}
                    name="stock"
                    onChange={handleChange}
                    ref={initialRef}
                    placeholder="Stock"
                  />
                </FormControl>
                <FormControl mb={2}>
                  <Input
                    bg={"brand.input"}
                    border={"2px solid #603C2B"}
                    name="price"
                    onChange={handleChange}
                    ref={initialRef}
                    placeholder="Price"
                  />
                </FormControl>
                <FormControl mb={2}>
                  <Input
                    bg={"brand.input"}
                    border={"2px solid #603C2B"}
                    as={"textarea"}
                    name="description"
                    onChange={handleChange}
                    h={"150px"}
                    ref={initialRef}
                    placeholder="Description"
                  />
                </FormControl>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <Button
                  w={"50%"}
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  Product Image
                </Button>
                <Box justifySelf={"center"}>
                  <Button
                    onClick={handleSubmit}
                    w={"300px"}
                    bg={"brand.coklat"}
                    color={"white"}
                    mt={8}
                  >
                    Add Product
                  </Button>
                </Box>
              </Box>
              <Box w={"50%"} alignItems={"center"}>
                <Image
                  w={"100%"}
                  h={"250px"}
                  objectFit={"contain"}
                  src={
                    imagePreview ||
                    "https://static.thenounproject.com/png/2932881-200.png"
                  }
                />
              </Box>
            </Flex>
          </Stack>
        </ModalBody>

        <ModalFooter w={"100%"}></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductModal;
