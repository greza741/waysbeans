import { formatCurrency } from "@/components/addOther/formatCurrency";
import { useAppDispatch } from "@/stores";
import { deleteProductAsync } from "@/stores/product/async";
import { Product } from "@/stores/product/slice";
import {
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";

export function ProductTable({ products }: { products: Product[] }) {
  const dispatch = useAppDispatch();

  const handleDelete = async (id: number) => {
    await dispatch(deleteProductAsync(id));
  };

  return (
    <Box h={"100%"} w={"100%"}>
      <TableContainer>
        <Stack
          w={"100%"}
          h={"400px"}
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
          <Table variant="striped" colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th color={"white"}>No</Th>
                <Th color={"white"}>Photo</Th>
                <Th color={"white"}>Product Name</Th>
                <Th color={"white"}>Product Decs</Th>
                <Th color={"white"}>Price</Th>
                <Th color={"white"}>Qty</Th>
                <Th color={"white"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products?.map((product: Product, index: number) => (
                <Tr key={product.id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Image
                      src={product.image}
                      alt={product.name}
                      objectFit={"cover"}
                      w={"50px"}
                      h={"50px"}
                    />
                  </Td>
                  <Td>{product.name}</Td>
                  <Td>
                    {/* nanti ganti productDescription dengan deskripsi database */}
                    {product.description.length > 25
                      ? product.description.substring(0, 25) + "..."
                      : product.description}
                  </Td>
                  <Td>{formatCurrency(product.price)}</Td>
                  <Td>{product.stock}</Td>
                  <Td>
                    {" "}
                    <Box>
                      <Button
                        color={"white"}
                        bgColor={"#F74C4C"}
                        p={"0px 45px"}
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </TableContainer>
    </Box>
  );
}
