import { CreateProductDto, UpdateProductDto } from "@/types";
import http from "./axios";

const getAll = () => {
    return http.get(`/products`)
}

const removeProduct = (id: number) => {
    return http.delete(`/products/${id}`);
};

const getProductById = (id: number) => {
    return http.get(`/products/${id}`)
}

const getProductsByCategory = (categoryPath: string) => {
    return http.get(`/products/category/${categoryPath}`)
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

const ProductService = { getProductById, getProductsByCategory, getProductsByName, getAll, removeProduct, createProduct, updateProduct }

export default ProductService