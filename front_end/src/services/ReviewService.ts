import { ReviewInterface } from "@/types";
import http from "./axios";

const createReview = (data: ReviewInterface) => {
    return http.post("/reviews", data)
}

const getListReviewByProductId = (productId: number) => {
    return http.get(`/reviews/list/${productId}`)
}

const getListReview = () => {
    return http.get(`/reviews/list`)
}

const blockListReview = (data: { ids: number[] }) => {
    return http.post(`/reviews/list/block`, data)
}

const activeReview = (id: number) => {
    return http.patch(`/reviews/active/${id}`)
}

const ReviewService = { createReview, getListReviewByProductId, getListReview, blockListReview, activeReview }

export default ReviewService