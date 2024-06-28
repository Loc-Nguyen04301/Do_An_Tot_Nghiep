import http from "./axios";
import { CreateCategoryType } from "@/pages/admin/CategoryAdmin";

const getAll = () => {
    return http.get(`/category`)
}

const createCategory = (data: CreateCategoryType) => {
    return http.post(`/category`, data)
}

const CategoryService = { getAll, createCategory }

export default CategoryService