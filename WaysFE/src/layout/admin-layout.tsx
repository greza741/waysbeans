import { useAppDispatch, useAppSelector } from "@/stores";
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
import { LOGOUT } from "@/stores/auth/slice";
import LogoLogout from "../assets/logout.png";
import LogoKopi from "../assets/logo kopi.png";

export function AdminLayout() {
  const location = useLocation();
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (userRole !== "ADMIN") {
    return <Navigate to="/home" state={{ from: location }} replace />;
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
            onClick={() => navigate("/admin")}
            style={{ cursor: "pointer" }}
            src={logo}
            alt="Logo"
            height="40px"
          />
          <Flex>
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
                  onClick={() => navigate("addProduct")}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <Image src={LogoKopi} w={"20px"} />
                  Add Product
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
