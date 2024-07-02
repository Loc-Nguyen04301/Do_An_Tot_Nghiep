import React, { Suspense, lazy, useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import AdminLayout from "@/layouts/AdminLayout";
import Loading from "@/components/Alert/Loading";
import GuestGuard from "@/guards/GuestGuard";
import AuthGuard from "@/guards/AuthGuard";
import ManagementGuard from "@/guards/ManagementGuard";
import HavingCart from "@/guards/HavingCart";
import CheckAvailable from "@/guards/CheckAvailable";
import ChangePassword from "@/pages/ChangePassword";

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
const WishList = lazy(() => import("@/pages/WishList"));
const PurchaseDetail = lazy(() => import("@/pages/PurchaseDetail"));

const DashBoard = lazy(() => import("@/pages/admin/Dashboard"));
const Inventory = lazy(() => import("@/pages/admin/Inventory"));
const OrderAdmin = lazy(() => import("@/pages/admin/OrderAdmin"));
const Customer = lazy(() => import("@/pages/admin/Customer"));
const UpdateProduct = lazy(() => import("@/pages/admin/UpdateProduct"));
const CreateProduct = lazy(() => import("@/pages/admin/CreateProduct"));
const UpdateBill = lazy(() => import("@/pages/admin/UpdateBill"));
const Notification = lazy(() => import("@/pages/admin/Notification"));
const Transaction = lazy(() => import("@/pages/admin/Transaction"));
const CategoryAdmin = lazy(() => import("@/pages/admin/CategoryAdmin"));
const ReviewAdmin = lazy(() => import("@/pages/admin/ReviewAdmin"));
const SaleCampaign = lazy(() => import("@/pages/admin/SaleCampaign"));

export enum RoutePath {
  NotFound = "/not-found",
  Home = "/",
  LoginPage = "/dang-nhap",
  RegisterPage = "/dang-ky",
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
  WishList = "/wishlist",
  PurchaseDetail = "/user/purchase/detail",
  ChangePassword = "/user/change-password",

  DashBoard = "/admin",
  Inventory = "/admin/inventory",
  OrderAdmin = "/admin/order",
  Customer = "/admin/customer",
  Notification = "/admin/notification",
  UpdateProduct = "/admin/product/detail",
  CreateProduct = "/admin/product/create",
  UpdateBill = "/admin/bill/detail",
  Transaction = "/admin/transaction",
  Category = "/admin/category",
  ReviewAdmin = "/admin/review",
  SaleCampaign = "/admin/sale-campaign"
}

const Router: React.FC = () => {
  const routes = useRoutes([
    {
      path: RoutePath.DashBoard,
      element: <AdminLayout />,
      children: [
        {
          path: RoutePath.DashBoard,
          element:
            <AuthGuard>
              <ManagementGuard>
                <DashBoard />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: `${RoutePath.UpdateProduct}/:id`,
          element:
            <AuthGuard>
              <ManagementGuard onlyAdmin={true}>
                <UpdateProduct />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: `${RoutePath.CreateProduct}`,
          element:
            <AuthGuard>
              <ManagementGuard onlyAdmin={true}>
                <CreateProduct />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: `${RoutePath.UpdateBill}/:id`,
          element:
            <AuthGuard>
              <ManagementGuard onlyAdmin={true}>
                <UpdateBill />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: RoutePath.Inventory,
          element:
            <AuthGuard>
              <ManagementGuard onlyAdmin={true}>
                <Inventory />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: RoutePath.OrderAdmin,
          element:
            <AuthGuard>
              <ManagementGuard>
                <OrderAdmin />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: RoutePath.Customer,
          element:
            <AuthGuard>
              <ManagementGuard>
                <Customer />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: RoutePath.Notification,
          element:
            <AuthGuard>
              <ManagementGuard>
                <Notification />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: RoutePath.Transaction,
          element:
            <AuthGuard>
              <ManagementGuard onlyAdmin={true}>
                <Transaction />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: RoutePath.Category,
          element:
            <AuthGuard>
              <ManagementGuard onlyAdmin={true}>
                <CategoryAdmin />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: RoutePath.ReviewAdmin,
          element:
            <AuthGuard>
              <ManagementGuard onlyAdmin={true}>
                <ReviewAdmin />
              </ManagementGuard>
            </AuthGuard>
        },
        {
          path: RoutePath.SaleCampaign,
          element:
            <AuthGuard>
              <ManagementGuard onlyAdmin={true}>
                <SaleCampaign />
              </ManagementGuard>
            </AuthGuard>
        },
      ]
    },
    {
      path: RoutePath.Home,
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
            <AuthGuard>
              <Purchase />
            </AuthGuard>
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
          element:
            <CheckAvailable>
              <DetailProduct />
            </CheckAvailable>
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
          path: RoutePath.WishList,
          element:
            <WishList />
        },
        {
          path: `${RoutePath.PurchaseDetail}/:id`,
          element:
            <AuthGuard>
              <PurchaseDetail />
            </AuthGuard>
        },
        {
          path: `${RoutePath.ChangePassword}`,
          element:
            <AuthGuard>
              <ChangePassword />
            </AuthGuard>
        },
        {
          path: `*`,
          element: <NotFound />,
        },
      ]
    },
  ])

  const { pathname } = useLocation();
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    };

    scrollToTop()
  }, [pathname]);


  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
};

export default Router;
