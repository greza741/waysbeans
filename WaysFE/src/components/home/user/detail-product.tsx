import { formatCurrency } from "@/components/addOther/formatCurrency";
import { useAppDispatch, useAppSelector } from "@/stores";
import { addItemToCartAsync } from "@/stores/cart/async";
import { getAllProductsAsync } from "@/stores/product/async";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function Detail() {
  const dispatch = useAppDispatch();
  const { idProduct } = useParams();
  const navigate = useNavigate();
  const product = useAppSelector((state) => state.product).products.find(
    (product) => product.id === +idProduct!
  );
  const userId = useAppSelector((state) => state.auth.user?.id);

  if (!product) {
    return <div>Product not found</div>;
  }
  const handleAddItem = async (productId: number) => {
    if (userId) {
      await dispatch(addItemToCartAsync({ userId, productId, quantity: 1 }));
      toast.success("Item added to cart");
    }
  };

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  return (
    <Box bgColor={"brand.background"}>
      <Box padding={"50px 100px"} display={"flex"} flexDirection={"row"}>
        <Box flex={1}>
          <Image
            src={product?.image}
            h={"600px"}
            w={"800px"}
            objectFit={"cover"}
          />
        </Box>
        <Box
          paddingLeft={"100px"}
          paddingTop={"70px"}
          display={"flex"}
          flexDirection={"column"}
          flex={1}
        >
          <Text fontWeight={"bold"} fontSize={"50px"} color={"brand.coklat"}>
            {product?.name}
          </Text>
          <Text color={"brand.coklat"}>Stock : {product?.stock}</Text>
          <Text marginTop={"20px"}>{product?.description}</Text>
          <Box justifyItems={"end"} marginTop={"80px"}>
            <Text fontWeight={"bold"} fontSize={"40px"} color={"brand.coklat"}>
              {formatCurrency(product?.price)}
            </Text>
          </Box>
          <Box marginTop={"25px"}>
            <Button
              onClick={() => handleAddItem(product.id)}
              w={"100%"}
              color={"white"}
              bg={"brand.coklat"}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
