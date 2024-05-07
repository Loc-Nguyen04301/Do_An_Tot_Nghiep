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

const ProductService = { getProductByCategory, getProductById, getProductsByCategory, getProductsByName, getAll, removeProduct }

export default ProductService