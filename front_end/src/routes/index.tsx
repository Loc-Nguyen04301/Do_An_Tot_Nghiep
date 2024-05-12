import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import AdminLayout from "@/layouts/AdminLayout";
import Loading from "@/components/Alert/Loading";
import GuestGuard from "@/guards/GuestGuard";
import AuthGuard from "@/guards/AuthGuard";
import HavingCart from "@/guards/HavingCart";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Contact = lazy(() => import("@/pages/Contact"));
const BankAccount = lazy(() => import("@/pages/BankAccount"));
const DetailProduct = lazy(() => import("@/pages/DetailProduct"));
const ListProductByCategory = lazy(() => import("@/pages/ListProductByCategory"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const OrderComplete = lazy(() => import("@/pages/OrderComplete"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Profile = lazy(() => import("@/pages/Profile"));
const Purchase = lazy(() => import("@/pages/Purchase"));

const DashBoard = lazy(() => import("@/pages/admin/Dashboard"));
const Inventory = lazy(() => import("@/pages/admin/Inventory"));
const OrderAdmin = lazy(() => import("@/pages/admin/OrderAdmin"));
const Customer = lazy(() => import("@/pages/admin/Customer"));
const UpdateProduct = lazy(() => import("@/pages/admin/UpdateProduct"));
const CreateProduct = lazy(() => import("@/pages/admin/CreateProduct"));

export enum RoutePath {
  LoginPage = "/dang-nhap",
  RegisterPage = "/dang-ky",
  Home = "/",
  Profile = "/user/profile",
  Purchase = "/user/purchase",
  AboutUs = "/gioi-thieu",
  Contact = "/lien-he",
  BankAccount = "/tai-khoan-ngan-hang",
  DetailProduct = "/san-pham",
  ListByCategory = "/danh-muc",
  CartPage = "/gio-hang",
  CheckoutPage = "/thanh-toan",
  OrderComplete = "/order-complete",

  DashBoard = "/admin",
  Inventory = "/admin/inventory",
  OrderAdmin = "/admin/order",
  Customer = "/admin/customer",
  UpdateProduct = "/admin/product/detail",
  CreateProduct = "/admin/product/create",
}

const Router: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: RoutePath.DashBoard,
          element: <DashBoard />
        },
        {
          path: `${RoutePath.UpdateProduct}/:id`,
          element: <UpdateProduct />
        },
        {
          path: `${RoutePath.CreateProduct}`,
          element: <CreateProduct />
        },
        {
          path: RoutePath.Inventory,
          element: <Inventory />
        },
        {
          path: RoutePath.OrderAdmin,
          element: <OrderAdmin />
        },
        {
          path: RoutePath.Customer,
          element: <Customer />
        },
      ]
    },
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: RoutePath.Home,
          element: <Home />,
        },
        {
          path: RoutePath.LoginPage,
          element:
            <GuestGuard>
              <Login />
            </GuestGuard>
        },
        {
          path: RoutePath.RegisterPage,
          element:
            <GuestGuard>
              <Register />
            </GuestGuard>
        },
        {
          path: RoutePath.Profile,
          element:
            <AuthGuard>
              <Profile />
            </AuthGuard>
        },
        {
          path: RoutePath.Purchase,
          element:
            <Purchase />
        },
        {
          path: RoutePath.AboutUs,
          element: <AboutUs />,
        },
        {
          path: RoutePath.Contact,
          element: <Contact />,
        },
        {
          path: RoutePath.BankAccount,
          element: <BankAccount />,
        },
        {
          path: `${RoutePath.ListByCategory}/:category`,
          element: <ListProductByCategory />,
        },
        {
          path: `${RoutePath.DetailProduct}/:label`,
          element: <DetailProduct />,
        },
        {
          path: RoutePath.CartPage,
          element: <Cart />,
        },
        {
          path: RoutePath.CheckoutPage,
          element:
            <HavingCart>
              <Checkout />
            </HavingCart>
        },
        {
          path: RoutePath.OrderComplete,
          element:
            <OrderComplete />
        },
        {
          path: `*`,
          element: <NotFound />,
        },
      ]
    },
  ])

  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
};

export default Router;
