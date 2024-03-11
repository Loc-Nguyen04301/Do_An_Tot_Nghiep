import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useRoutes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import NotFound from "../pages/NotFound";
import Loading from "../components/Alert/Loading";

const Home = lazy(() => import("../pages/Home"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Contact = lazy(() => import("../pages/Contact"));
const BankAccount = lazy(() => import("../pages/BankAccount"));
const DetailProduct = lazy(() => import("../pages/DetailProduct"));
const ListProductByCategory = lazy(() => import("../pages/ListProductByCategory"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));

export enum RoutePath {
  Home = "/",
  AboutUs = "/gioi-thieu",
  Contact = "/lien-he",
  BankAccount = "/tai-khoan-ngan-hang",
  DetailProduct = "/san-pham",
  ListByCategory = "/danh-muc",
  CartPage = "/gio-hang",
  CheckoutPage = "/thanh-toan",
  LoginPage = "/dang-nhap",
  RegisterPage = "/dang-ky"
}

const Router: React.FC = () => {
  const routes = useRoutes([
    {
      element: <DefaultLayout />,
      children: [
        {
          path: RoutePath.Home, element: <Home />,
        },
        {
          path: RoutePath.LoginPage, element: <Login />,
        },
        {
          path: RoutePath.RegisterPage, element: <Register />,
        },
        {
          path: RoutePath.AboutUs, element: <AboutUs />,
        },
        {
          path: RoutePath.Contact, element: <Contact />,
        },
        {
          path: RoutePath.BankAccount, element: <BankAccount />,
        },
        {
          path: `${RoutePath.DetailProduct}/:label`, element: <DetailProduct />,
        },
        {
          path: RoutePath.CartPage, element: <Cart />,
        },
        {
          path: RoutePath.CheckoutPage, element: <Checkout />,
        },
        {
          path: `${RoutePath.ListByCategory}/:category`, element: <ListProductByCategory />,
        },
      ]
    }
  ])

  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
};

export default Router;
