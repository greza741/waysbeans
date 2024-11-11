import { useAppDispatch, useAppSelector } from "@/stores";
import { Box, Button, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAsync } from "@/stores/auth/async";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerSchema, RegisterSchema } from "@/validation/register-schema";
import logo from "../../assets/Icon.png";

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);
  const { control, handleSubmit, reset } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    const res = await dispatch(registerAsync(data));

    if (registerAsync.fulfilled.match(res)) {
      reset({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    }
  };

  const onError: SubmitErrorHandler<RegisterSchema> = () => {
    toast.error("Register failed");
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
                  Register
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
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border={"2px solid #603C2B"}
                      bg={"#D4CECB"}
                      placeholder="Name"
                    />
                  )}
                />

                <Button
                  type="submit"
                  bgColor={"brand.coklat"}
                  color={"white"}
                  borderRadius={"10px"}
                >
                  {loading ? "Loading..." : "Register"}
                </Button>
                <Text>
                  Already have an account? Click{" "}
                  <a
                    onClick={() => navigate("/login")}
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                  >
                    Here
                  </a>
                </Text>
              </Stack>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
