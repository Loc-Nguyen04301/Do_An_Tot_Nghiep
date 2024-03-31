import axios from "axios";
import { LoginInterface } from "../types";
import { getAccessToken, getRefreshToken } from "../utils";
import http, { getBaseUrl } from "./axios";

const getProductByCategory = (category: string) => {
    return http.get(`/products/category/${category}`)
}

const getProductById = (id: number) => {
    return http.get(`/products/${id}`)
}

const getProductsByCategory = (category: string) => {
    return http.get(`/products/category/${category}`)
}

const ProductService = { getProductByCategory, getProductById, getProductsByCategory }

export default ProductService