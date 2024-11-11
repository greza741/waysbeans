import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import logo2 from "@/assets/Icon2.png";
import logo3 from "@/assets/waves 1.png";
import gambar from "@/assets/Rectangle 3.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/stores";
import { getAllProductsAsync } from "@/stores/product/async";
import { useEffect } from "react";
import { formatCurrency } from "@/components/addOther/formatCurrency";
import type { Product } from "@/stores/product/slice";

export function Product() {
  const dispatch = useAppDispatch();
  const products: Product[] = useAppSelector((state) => state.product.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  return (
    <>
      <Flex flexDirection={{ base: "row", md: "column" }} m={20}>
        <Flex>
          <Box
            w={"90%"}
            bg="brand.background3"
            display={"flex"}
            flexDirection={"row"}
            h={"300px"}
          >
            <Box p={8} display={"flex"} flexDirection={"column"} w={"60%"}>
              <Box>
                <Image
                  src={logo2}
                  objectFit={"contain"}
                  alt="Logo"
                  height="130px"
                />
              </Box>
              <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={4}>
                BEST QUALITY COFFEE BEANS
              </Heading>
              <Text fontSize="lg" mb={4}>
                Quality freshly roasted coffee made just for you. Pour, brew and
                enjoy.
              </Text>
            </Box>
            <Box alignContent={"end"}>
              <Image src={logo3} alt="Logo" height="10rem" />
            </Box>
          </Box>
          <Box ml={"-19rem"} p={3}>
            <Image src={gambar} h={"12rem"} w={"22rem"} />
          </Box>
        </Flex>
        {/* Product Grid */}
        <Box paddingTop={10}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
            {products.map((product) => (
              <Box key={product.id} bg="brand.product" borderRadius="md">
                <Image
                  src={product.image}
                  alt={product.name}
                  objectFit={"cover"}
                  mx="auto"
                  mb={4}
                  h={"300px"}
                  w={"100%"}
                  onClick={() => navigate(`detail/${product.id}`)}
                />
                <Text fontWeight="bold" m={2}>
                  {product.name}
                </Text>
                <Text ml={2}>{formatCurrency(product.price)}</Text>
                <Text ml={2} mb={2}>
                  Stock: {product.stock}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Flex>
    </>
  );
}
