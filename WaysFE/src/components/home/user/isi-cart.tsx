import { formatCurrency } from "@/components/addOther/formatCurrency";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/icon/icon";
import { useAppDispatch, useAppSelector } from "@/stores";
import {
  addItemToCartAsync,
  clearCartAsync,
  getCartAsync,
  removeItemFromCartAsync,
} from "@/stores/cart/async";
import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const IsiCart = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.cart);
  const userId = useAppSelector((state) => state.auth.user?.id);
  // const cartId = useAppSelector((state) => state.cart.id);
  // useEffect(() => {
  //   if (cartId) {
  //     setCartId(cartId);
  //   }
  // }, [cartId, setCartId]);

  useEffect(() => {
    if (userId) {
      dispatch(getCartAsync(userId));
    }
  }, [dispatch, userId]);

  const handleAddItem = async (productId: number) => {
    await dispatch(
      addItemToCartAsync({ userId: userId!, productId, quantity: 1 })
    );
    toast.success("Item added to cart");
    dispatch(getCartAsync(userId!));
  };
  const handleLessItem = async (productId: number) => {
    await dispatch(
      addItemToCartAsync({ userId: userId!, productId, quantity: -1 })
    );
    toast.success("Less 1 item from cart");
    dispatch(getCartAsync(userId!));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeItemFromCartAsync({ userId: userId!, productId }));
  };

  const handleClearCart = () => {
    dispatch(clearCartAsync(userId!));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {items.map((item) => (
        <Flex
          alignItems="center"
          justifyContent="space-between"
          p="4"
          borderBottom="1px solid #e2e2e2"
          key={item.id}
        >
          <Image boxSize="80px" src={item.product.image} />
          <VStack align="flex-start" flex="1" px="4">
            <Text ml={"4"} fontWeight="bold" color={"brand.coklat"}>
              {item.product.name}
            </Text>
            <Flex alignItems={"center"}>
              <Button
                onClick={() => handleLessItem(item.product.id)}
                bgColor={"transparent"}
                _hover={{ bgColor: "transparent" }}
              >
                <MinusIcon />
              </Button>
              <Box>
                <Text>{item.quantity}</Text>
              </Box>
              <Button
                onClick={() => handleAddItem(item.product.id)}
                bgColor={"transparent"}
                _hover={{ bgColor: "transparent" }}
              >
                <PlusIcon />
              </Button>
            </Flex>
          </VStack>
          <Box>
            <Text fontWeight="bold" ml="4" color={"brand.coklat"}>
              {formatCurrency(item.totalPrice)}
            </Text>
            <Text
              justifyItems={"end"}
              cursor="pointer"
              color="red.500"
              fontWeight="bold"
              fontSize="lg"
              mt={-4}
              onClick={() => handleRemoveItem(item.product.id)}
            >
              <TrashIcon />
            </Text>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default IsiCart;
