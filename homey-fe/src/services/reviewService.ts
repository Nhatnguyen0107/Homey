import axios from "./axiosClient";
import type { ReviewResDto, GetAllReviewParams } from "../types/review";
// import type { TAny } from "../types/common";

export const ReviewService = {
    async getAll(params?: GetAllReviewParams): Promise<ReviewResDto> {
        const res = await axios.get<ReviewResDto>("/reviews", { params });
        return res.data;
    },
};

export default ReviewService;
