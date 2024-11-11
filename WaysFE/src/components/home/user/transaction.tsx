import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/stores";
import { getCartAsync } from "@/stores/cart/async";
import { useEffect } from "react";
import { getUserTransactionItemsAsync } from "@/stores/user/async";
import { formatCurrency } from "@/components/addOther/formatCurrency";
import logo from "@/assets/Icon.png";
import barcode from "@/assets/barcode.png";

export function MyTransaction() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const transactionStatus = useAppSelector(
    (state) => state.user.transactions?.[0]?.status
  );
  const userId = useAppSelector((state) => state.auth.user?.id);
  const transactions = useAppSelector((state) => state.user.transactions);
  console.log("check id:", transactions);

  useEffect(() => {
    if (userId) {
      dispatch(getCartAsync(userId));
    }
    dispatch(getUserTransactionItemsAsync());
  }, [dispatch, userId]);

  return (
    <Box h={"300px"} w={"650px"}>
      <Flex flexDirection="column" w="100%" m="auto" h="100%" roundedTop="lg">
        <Stack
          px={4}
          py={2}
          overflowY="auto"
          flex={1}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#d5e3f7",
              borderRadius: "24px",
            },
          }}
        >
          {transactions?.map((transaction) => (
            <Box
              key={transaction.id}
              display={"flex"}
              flexDirection={"row"}
              border={"1px solid transparent"}
              borderRadius={"10px"}
              padding={"10px"}
              w={"600px"}
              bgColor={"brand.background3"}
            >
              {transaction.TransactionItem?.map((item) => (
                <Box key={item.id} display="flex" flexDirection="row">
                  <Box>
                    <Image
                      w={"200px"}
                      h={"200px"}
                      objectFit={"cover"}
                      src={item.product.image}
                    />
                  </Box>
                  <Box
                    paddingLeft={"20px"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <Text
                        fontWeight={"bold"}
                        color={"brand.orange"}
                        fontSize={"25px"}
                      >
                        {item.product.name}
                      </Text>
                      <Text
                        fontWeight={"bold"}
                        color={"brand.orange"}
                        fontSize={"11"}
                      >
                        Monday,{" "}
                        <Text as={"span"} fontWeight={"normal"}>
                          22 June 2022
                        </Text>
                      </Text>
                      <Text paddingTop={"20px"}>
                        Price : {formatCurrency(item.product.price)}
                      </Text>
                      <Text>Quantity : {item.quantity}</Text>
                    </Box>
                    <Box>
                      <Text>Sub Total : {formatCurrency(item.subTotal)}</Text>
                    </Box>
                  </Box>
                  <Box w={"200px"} justifyItems={"center"}>
                    <Box>
                      <Image src={logo} />
                    </Box>
                    <Box mt={4}>
                      <Image src={barcode} h={"80px"} />
                    </Box>
                    <Box>
                      <Text paddingTop={"20px"}>{transaction.status}</Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
}
