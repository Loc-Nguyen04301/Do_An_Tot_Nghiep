import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import NotFound from "../pages/NotFound";

const Home = lazy(() => import("../pages/Home"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Contact = lazy(() => import("../pages/Contact"));
const BankAccount = lazy(() => import("../pages/BankAccount"));
const DetailProduct = lazy(() => import("../pages/DetailProduct"));
const ListProductByCategory = lazy(() => import("../pages/ListProductByCategory"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export enum RoutePath {
  Home = "/",
  AboutUs = "/gioi-thieu",
  Contact = "/lien-he",
  BankAccount = "/tai-khoan-ngan-hang",
  DetailProduct = "/san-pham/:label",
  ListByCategory = "/danh-muc/:category",
}

const publicRoutes = [
  {
    path: RoutePath.Home,
    component: Home,
    layout: DefaultLayout,
  },
  {
    path: RoutePath.AboutUs,
    component: AboutUs,
    layout: DefaultLayout,
  },
  {
    path: RoutePath.Contact,
    component: Contact,
    layout: DefaultLayout,
  },
  {
    path: RoutePath.BankAccount,
    component: BankAccount,
    layout: DefaultLayout,
  },
  {
    path: RoutePath.DetailProduct,
    component: DetailProduct,
    layout: DefaultLayout,
  },
  {
    path: "/dang-nhap",
    component: Login,
    layout: DefaultLayout,
  },
  {
    path: "/dang-ky",
    component: Register,
    layout: DefaultLayout,
  },
  //   {
  //     path: "/gio-hang",
  //     component: ShoppingCart,
  //     layout: DefaultLayout,
  //   },
  //   {
  //     path: "/thanh-toan",
  //     component: Checkout,
  //     layout: DefaultLayout,
  //   },
  //   {
  //     path: "/search/:search",
  //     component: Search,
  //     layout: DefaultLayout,
  //   },
  {
    path: "/danh-muc/:category",
    component: ListProductByCategory,
    layout: DefaultLayout,
  },
  {
    path: "/404",
    component: NotFound,
    layout: DefaultLayout,
  },
]

export { publicRoutes }
