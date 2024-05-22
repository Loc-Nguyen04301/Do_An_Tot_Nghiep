import React, { memo, useEffect, useState } from 'react'
import { IDetailProduct, Review } from '@/pages/DetailProduct'
import { Avatar, Pagination, Rate } from 'antd'
import ReviewService from '@/services/ReviewService'
import clsx from 'clsx'
import { number } from 'yup'

interface ListReviewProps {
    product: IDetailProduct
    handlePreviewImage: (src: string) => void
}

enum RatingStar {
    all = 'Tất cả',
    five = 5,
    four = 4,
    three = 3,
    two = 2,
    one = 1,
}

const ListReview = ({ product, handlePreviewImage }: ListReviewProps) => {
    const [reviews, setReviews] = useState<Review[]>()
    const [filterReviews, setFilterReviews] = useState<Review[]>()
    const [star, setStar] = useState<RatingStar>(RatingStar.all)
    const [numberByStar, setNumberByStar] = useState<{
        average_rating?: number,
        all_star?: number,
        five_star?: number,
        four_star?: number,
        three_star?: number,
        two_star?: number,
        one_star?: number
    }>({
        average_rating: undefined,
        all_star: undefined,
        five_star: undefined,
        four_star: undefined,
        three_star: undefined,
        two_star: undefined,
        one_star: undefined
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    useEffect(() => {
        const getListReviewByProductId = async (productId: number) => {
            const res = await ReviewService.getListReviewByProductId(productId)
            setReviews(res.data.data.listReview)
            setNumberByStar({ ...res.data.data })
        }

        if (product.id) getListReviewByProductId(product.id)
    }, [product.id])

    useEffect(() => {
        var filterReviews: Review[];
        if (reviews) {
            switch (star) {
                case RatingStar.all:
                    setFilterReviews(reviews)
                    break;
                case RatingStar.five:
                    filterReviews = reviews.filter(review => review.star === 5)
                    setFilterReviews(filterReviews)
                    break;
                case RatingStar.four:
                    filterReviews = reviews.filter(review => review.star === 4)
                    setFilterReviews(filterReviews)
                    break;
                case RatingStar.three:
                    filterReviews = reviews.filter(review => review.star === 3)
                    setFilterReviews(filterReviews)
                    break;
                case RatingStar.two:
                    filterReviews = reviews.filter(review => review.star === 2)
                    setFilterReviews(filterReviews)
                    break;
                case RatingStar.one:
                    filterReviews = reviews.filter(review => review.star === 1)
                    setFilterReviews(filterReviews)
                    break;
            }
        }
    }, [star, reviews])

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate the current items to display based on the current page and page size
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentFilterReviews = filterReviews?.slice(startIndex, endIndex);

    const handleChangeStarStatus = (number: RatingStar) => {
        setCurrentPage(1)
        setStar(number)
    }

    return (
        <>
            <div className='bg-[#fffbf8] border border-[#f9ede5] p-7 flex gap-10 mt-3'>
                <div>
                    <div className='text-main-orange-color'>
                        <span className='text-[30px] mr-2'>{numberByStar.average_rating?.toFixed(1)}</span>
                        <span className='text-[18px]'>trên 5</span>
                    </div>
                    <Rate disabled value={numberByStar?.average_rating} />
                </div>
                <div>
                    <div className={clsx('bg-white px-2 h-8 w-[100px] text-center leading-8 border inline-block mr-4 cursor-pointer', star === RatingStar.all && 'text-main-orange-color border-main-orange-color')} onClick={() => handleChangeStarStatus(RatingStar.all)}>Tất cả ({numberByStar.all_star})</div>
                    <div className={clsx('bg-white px-2 h-8 w-[100px] text-center leading-8 border inline-block mr-4 cursor-pointer', star === RatingStar.five && 'text-main-orange-color border-main-orange-color')} onClick={() => handleChangeStarStatus(RatingStar.five)}>5 sao ({numberByStar.five_star})</div>
                    <div className={clsx('bg-white px-2 h-8 w-[100px] text-center leading-8 border inline-block mr-4 cursor-pointer', star === RatingStar.four && 'text-main-orange-color border-main-orange-color')} onClick={() => handleChangeStarStatus(RatingStar.four)}>4 sao ({numberByStar.four_star})</div>
                    <div className={clsx('bg-white px-2 h-8 w-[100px] text-center leading-8 border inline-block mr-4 cursor-pointer', star === RatingStar.three && 'text-main-orange-color border-main-orange-color')} onClick={() => handleChangeStarStatus(RatingStar.three)}>3 sao ({numberByStar.three_star})</div>
                    <div className={clsx('bg-white px-2 h-8 w-[100px] text-center leading-8 border inline-block mr-4 cursor-pointer', star === RatingStar.two && 'text-main-orange-color border-main-orange-color')} onClick={() => handleChangeStarStatus(RatingStar.two)}>2 sao ({numberByStar.two_star})</div>
                    <div className={clsx('bg-white px-2 h-8 w-[100px] text-center leading-8 border inline-block mr-4 cursor-pointer', star === RatingStar.one && 'text-main-orange-color border-main-orange-color')} onClick={() => handleChangeStarStatus(RatingStar.one)}>1 sao ({numberByStar.one_star})</div>
                </div>
            </div>
            <ul>
                {currentFilterReviews && currentFilterReviews.map((review) => (
                    <li key={`${review.id}`} className="flex gap-4 border-b border-border-color py-4 last:border-b-0">
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
                                {review?.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        className="max-h-[100px] cursor-zoom-in hover:opacity-70"
                                        onClick={() => handlePreviewImage(image)}
                                    />
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {filterReviews && filterReviews.length > pageSize && <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filterReviews?.length}
                onChange={handlePageChange}
                className='text-center'
            />}
        </>
    )
}

export default memo(ListReview)