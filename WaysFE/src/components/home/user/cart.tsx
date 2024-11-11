import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/stores";
import { createTransactionAsync } from "@/stores/transaction/async";
import { useEffect } from "react";
import IsiCart from "./isi-cart";
import { formatCurrency } from "@/components/addOther/formatCurrency";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart);
  const { paymentUrl, loading } = useAppSelector((state) => state.transaction);

  const userId = useAppSelector((state) => state.auth.user?.id);
  const cartId = useAppSelector((state) => state.cart.cartId);

  const handleCheckout = () => {
    dispatch(createTransactionAsync({ userId: userId!, cartId: cartId! }));
  };

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  return (
    <>
      <Flex p="8" direction={{ base: "column", lg: "row" }} align="center">
        <Box w="full" p="6" boxShadow="md" rounded="lg">
          <Text fontSize="2xl" fontWeight="bold" color={"brand.coklat"}>
            My Cart
          </Text>
          <Text mt={5} fontSize="1xl" color={"brand.coklat"}>
            Review Your Order
          </Text>
          <Divider my="4" />

          <IsiCart />

          <Divider my="4" />
          <Box textAlign="right">
            <Text fontWeight="bold" color={"brand.coklat"}>
              Subtotal: {formatCurrency(items.totalPrice)}
            </Text>
          </Box>
        </Box>
        <Box
          color={"brand.coklat"}
          w="full"
          maxW="400px"
          mt="8"
          p="6"
          boxShadow="md"
          rounded="lg"
        >
          <Text fontSize="lg" fontWeight="bold" mb="4">
            Order Summary
          </Text>
          <VStack align="stretch" spacing="2">
            <Flex justify="space-between">
              <Text>Subtotal</Text>
              <Text>{formatCurrency(items.totalPrice)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Shipping</Text>
              <Text color="blue.500" cursor="pointer">
                Calculate shipping
              </Text>
            </Flex>

            <Divider />
            <Flex justify="space-between" fontWeight="bold" fontSize="lg">
              <Text>Total</Text>
              <Text>{formatCurrency(items.totalPrice)}</Text>
            </Flex>
          </VStack>
          <Button
            onClick={handleCheckout}
            isLoading={loading}
            bg={"brand.coklat"}
            color={"white"}
            w="full"
            mt="4"
          >
            Checkout
          </Button>
          <Button
            bgColor={"transparent"}
            onClick={() => navigate("/")}
            textAlign="center"
            mt="4"
            color="brand.coklat"
            cursor="pointer"
          >
            or Continue shopping
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Cart;
