import React, { memo, useEffect, useState } from 'react'
import { IDetailProduct, Review } from '@/pages/DetailProduct'
import { Avatar, Rate } from 'antd'
import ReviewService from '@/services/ReviewService'

interface ListReviewProps {
    product: IDetailProduct
    handlePreviewImage: (src: string) => void
}

const ListReview = ({ product, handlePreviewImage }: ListReviewProps) => {
    const [reviews, setReviews] = useState<Review[]>([])

    useEffect(() => {
        const getListReviewByProductId = async (productId: number) => {
            const res = await ReviewService.getListReviewByProductId(productId)
            setReviews(res.data.data)
        }

        if (product.id) getListReviewByProductId(product.id)
    }, [product.id])

    return (
        <>
            {reviews.map((review) => (
                <div
                    key={`${review.id}`}
                    className="flex gap-4 border-b border-border-color py-4"
                >
                    <Avatar
                        src={review.user.avatar}
                        className="mt-1"
                    />
                    <div>
                        <span className="text-[#222] text-xs">
                            {review.user.username}
                        </span>
                        <div>
                            <Rate disabled defaultValue={review.star} />
                        </div>
                        <p className="text-[#0000008a] text-xs">
                            {review.created_at.substring(0, 10)}
                        </p>
                        <p className="text-black text-base">
                            {review.description}
                        </p>
                        <div className="image-lists flex gap-2 mt-3">
                            {review.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    className="max-h-[100px] cursor-zoom-in hover:opacity-70"
                                    onClick={() => handlePreviewImage(image)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default memo(ListReview)