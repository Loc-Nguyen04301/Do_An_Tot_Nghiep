import { ReviewInterface } from "@/types";
import http from "./axios";

const createReview = (data: ReviewInterface) => {
    return http.post("/reviews", data)
}

const ReviewService = { createReview }

export default ReviewService