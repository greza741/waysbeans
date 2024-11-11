import { useAppDispatch, useAppSelector } from "@/stores";
import { LOGOUT } from "@/stores/auth/slice";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Icon.png";
import LogoLogout from "../assets/logout.png";
import LogoUser from "../assets/user.png";
import cart from "../assets/shopping-basket (1) 1.png";

export function UserLayout() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (userRole !== "USER") {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

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
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
            src={logo}
            alt="Logo"
            height="40px"
          />
          <Flex>
            <Box mr={"20px"}>
              <Button
                onClick={() => navigate("cart")}
                _hover={{ bg: "transparent" }}
                bgColor={"transparent"}
              >
                <Image src={cart} />
              </Button>
            </Box>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  src={
                    user?.avatar ||
                    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  }
                />
              </MenuButton>
              <MenuList color={"black"} bg={"white"}>
                <MenuItem
                  onClick={() => navigate("profile")}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <Image src={LogoUser} w={"20px"} />
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    dispatch(LOGOUT());
                  }}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <Image src={LogoLogout} w={"20px"} />
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <Box h={"full"} w={"full"}>
        <Outlet />
      </Box>
    </>
  );
}
