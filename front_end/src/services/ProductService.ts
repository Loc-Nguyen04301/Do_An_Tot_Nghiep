import { CreateProductDto } from "@/types";
import http from "./axios";

const getAll = () => {
    return http.get(`/products`)
}

const removeProduct = (id: number) => {
    return http.delete(`/products/${id}`);
};

const getProductByCategory = (category: string) => {
    return http.get(`/products/category/${category}`)
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

const ProductService = { getProductByCategory, getProductById, getProductsByCategory, getProductsByName, getAll, removeProduct }

export default ProductService