import http from "./axios";

const getAll = () => {
    return http.get(`/category`)
}

const CategoryService = { getAll }

export default CategoryService