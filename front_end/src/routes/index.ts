import DefaultLayout from "../layouts/DefaultLayout"
import AboutUs from "../pages/AboutUs"
import BankAccount from "../pages/BankAccount"
import Contact from "../pages/Contact"
import DetailProduct from "../pages/DetailProduct"
import Home from "../pages/Home"
import ListProductByCategory from "../pages/ListProductByCategory"
import Login from "../pages/Login"
import NotFound from "../pages/NotFound"
import Register from "../pages/Register"

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
