import axios from "axios";
import { LoginInterface } from "../types";
import { getAccessToken, getRefreshToken } from "../utils";
import http, { getBaseUrl } from "./axios";

const getProductByCategory = (category: string) => {
    return http.get(`/products/category/${category}`)
}

const ProductService = { getProductByCategory }

export default ProductService