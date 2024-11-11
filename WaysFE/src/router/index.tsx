import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "@/layout/auth-layout";
import { Box } from "@chakra-ui/react";
import { RegisterForm } from "@/components/auth/register";
import { LoginForm } from "@/components/auth/login";
import { Home } from "@/components/home";
import { UserLayout } from "@/layout/user-layout";
import { Product } from "@/components/home/user/product";
import { Detail } from "@/components/home/user/detail-product";
import { Profile } from "@/components/home/user/profile";
import { AdminLayout } from "@/layout/admin-layout";
import { Transaction } from "@/components/home/admin/transaction";
import { ProductAdmin } from "@/components/home/admin/product";
import Cart from "@/components/home/user/cart";

const routes: RouteObject[] = [
  {
    path: "/home",
    element: <UserLayout />,
    children: [
      {
        path: "/home",
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: "detail/:idProduct",
            element: <Detail />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },

      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Transaction />,
      },
      {
        path: "addProduct",
        element: <ProductAdmin />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "*",
    element: <Box>404</Box>,
  },
];

export default function Router() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}
