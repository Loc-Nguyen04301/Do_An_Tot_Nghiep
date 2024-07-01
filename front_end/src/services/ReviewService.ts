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

const ReviewService = { createReview, getListReviewByProductId, getListReview }

export default ReviewService