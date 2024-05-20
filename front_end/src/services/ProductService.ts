import { CreateProductDto, UpdateProductDto } from "@/types";
import http, { getBaseUrl } from "./axios";
import axios from "axios";

const urlAPI = getBaseUrl()

const getAll = () => {
    return http.get(`/products`)
}

const removeProduct = (id: number) => {
    return http.delete(`/products/${id}`);
};

const getProductByCategory = (category: string) => {
    return axios.get(`${urlAPI}/products/category/${category}`)
}

const getProductById = (id: number) => {
    return http.get(`/products/${id}`)
}

const getProductsByCategory = (category: string) => {
    return http.get(`/products/category/${category}`)
}

const getProductsByName = (name: string) => {
    return http.get(`/products/name/${name}`)
}

const createProduct = (data: CreateProductDto) => {
    return http.post(`/products`, data)
}

const updateProduct = (id: number, data: UpdateProductDto) => {
    return http.patch(`/products/${id}`, data)
}

const ProductService = { getProductByCategory, getProductById, getProductsByCategory, getProductsByName, getAll, removeProduct, createProduct, updateProduct }

export default ProductService