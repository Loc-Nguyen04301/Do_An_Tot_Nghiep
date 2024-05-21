import { ReviewInterface } from "@/types";
import http from "./axios";

const createReview = (data: ReviewInterface) => {
    return http.post("/reviews", data)
}

const getListReviewByProductId = (productId: number) => {
    return http.get(`/reviews/list/${productId}`)
}

const ReviewService = { createReview, getListReviewByProductId }

export default ReviewService