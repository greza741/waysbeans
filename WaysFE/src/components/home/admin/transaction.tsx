import { formatCurrency } from "@/components/addOther/formatCurrency";
import { formatDate } from "@/components/addOther/formatDate";
import { Refresh } from "@/components/icon/icon";
import { useAppDispatch, useAppSelector } from "@/stores";
import {
  fetchTransactionStatusById,
  updateTransactionStatusAsync,
} from "@/stores/transaction/async";
import { getUserTransactionItemsAdminAsync } from "@/stores/user/async";
import { ITransactionItem } from "@/type/transaction";
import { TransactionStatusEnum } from "../../../type/transaction";
import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect } from "react";

export const Transaction = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state) => state.user.allUserTransactions
  );

  useEffect(() => {
    dispatch(getUserTransactionItemsAdminAsync());
  }, [dispatch]);

  const handleFetchAndUpdateStatus = async (transactionId: string) => {
    // Fetch status from Midtrans
    await dispatch(fetchTransactionStatusById(transactionId));
    // Refetch transactions to get the latest data
    await dispatch(getUserTransactionItemsAdminAsync());
  };

  const handleStatusChange = async (
    transactionId: string,
    status: TransactionStatusEnum
  ) => {
    await dispatch(updateTransactionStatusAsync({ transactionId, status }));
    await dispatch(getUserTransactionItemsAdminAsync());
  };

  return (
    <Flex>
      <Stack
        w="100%"
        h="100%"
        px={4}
        py={8}
        overflow="auto"
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
        {transactions?.map((transaction, index) => (
          <Box key={transaction.id} mb={8}>
            <TableContainer w="100%" borderTop="1px" rounded="lg">
              <Table variant="striped" bg="grey" color="black">
                <Thead>
                  <Tr>
                    <Th color="white">No</Th>
                    <Th color="white">Profile</Th>
                    <Th color="white">Name</Th>
                    <Th color="white">Phone</Th>
                    <Th color="white">Address</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Image
                        src={transaction.avatar}
                        alt="Profile Image"
                        objectFit="cover"
                        w="50px"
                        h="50px"
                      />
                    </Td>
                    <Td>{transaction.name}</Td>
                    <Td>{transaction.phone}</Td>
                    <Td>
                      {transaction.address.length > 20
                        ? transaction.address.substring(0, 25) + "..."
                        : transaction.address}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <TableContainer w="100%" borderBottom="1px" rounded="lg">
              <Table variant="simple" bg="grey" color="white">
                <Thead>
                  <Tr>
                    <Th color="white">No</Th>
                    <Th color="white">Items</Th>
                    <Th color="white">Total</Th>
                    <Th color="white">Status</Th>
                    <Th color="white">Date</Th>
                    <Th color="white">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {transaction.transaction.map((trans) =>
                    trans.TransactionItem.map(
                      (item: ITransactionItem, j: number) => (
                        <Tr key={item.id}>
                          <Td>{(j = 1)}</Td>
                          <Td>{item.product?.name}</Td>
                          <Td>{formatCurrency(item.product.price)}</Td>
                          <Td>
                            {trans.status}
                            <Button
                              ml={-2}
                              onClick={() =>
                                handleFetchAndUpdateStatus(trans.transactionId)
                              }
                              bgColor="transparent"
                              _hover={{ bgColor: "transparent" }}
                            >
                              <Refresh />
                            </Button>
                          </Td>
                          <Td>{formatDate(item.createdAt)}</Td>

                          <Td>
                            <Box>
                              <Button
                                marginRight="15px"
                                color="white"
                                bgColor="#56C05A"
                                p="0px 15px"
                              >
                                Kirim
                              </Button>
                              <Button
                                marginRight="15px"
                                color="white"
                                bgColor="red"
                                p="0px 15px"
                              >
                                Tolak
                              </Button>
                            </Box>
                          </Td>
                        </Tr>
                      )
                    )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Stack>
    </Flex>
  );
};

export default Transaction;
