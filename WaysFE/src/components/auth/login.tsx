import { useAppDispatch, useAppSelector } from "@/stores";
import { loginAsync } from "@/stores/auth/async";
import { loginSchema, LoginSchema } from "@/validation/login-schema";
import { Box, Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/Icon.png";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const { control, handleSubmit, reset } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const response = await dispatch(loginAsync(data));
    if (loginAsync.fulfilled.match(response)) {
      reset({
        email: "",
        password: "",
      });
    }
  };

  const navigate = useNavigate();
  const onError: SubmitErrorHandler<LoginSchema> = () => {
    toast.error("User Not Found");
  };

  return (
    <>
      <Box
        as="nav"
        bg="white"
        p={4}
        boxShadow="lg"
        position="sticky"
        top="0"
        zIndex="1000"
        bgColor={"brand.background2"}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Image
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            src={logo}
            alt="Logo"
            height="40px"
          />
          <Flex>
            <Button
              onClick={() => navigate("/login")}
              color={"brand.coklat"}
              border={"2px solid #603C2B"}
              mr={4}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              color={"white"}
              bg={"brand.coklat"}
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Flex
        display={"flex"}
        flexDirection={"row"}
        bgColor={"brand.background"}
        h={"100vh"}
        w={"100vw"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box p={"125px 0px"}>
          <Box p={"40px"} h={"350px"} w={"400px"} borderRadius={"10px"}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Stack spacing={4}>
                <Text
                  fontSize={"4xl"}
                  fontWeight={"bold"}
                  color={"brand.coklat"}
                >
                  Login
                </Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border={"2px solid #603C2B"}
                      bg={"#D4CECB"}
                      placeholder="Email"
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border={"2px solid #603C2B"}
                      bg={"#D4CECB"}
                      placeholder="Password"
                      type="password"
                    />
                  )}
                />
                <Button
                  type="submit"
                  bgColor={"brand.coklat"}
                  color={"white"}
                  borderRadius={"10px"}
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </Stack>
            </form>
            <Text mt={"10px"}>
              Don't have an account?{" "}
              <a
                onClick={() => navigate("/register")}
                style={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Register
              </a>
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
