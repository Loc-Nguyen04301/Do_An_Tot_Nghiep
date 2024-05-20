import { ChangeEvent, useState } from 'react'
import { IDetailProduct } from '..';
import { Rate } from 'antd';
import { checkImage, imageUpload } from '@/utils';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/redux-toolkit/hook';
import ReviewService from '@/services/ReviewService';
import { ReviewInterface } from '@/types';

interface ReviewContainerProps {
    product: IDetailProduct
    handlePreviewImage: (src: string) => void
}

const ReviewContainer = ({ product, handlePreviewImage }: ReviewContainerProps) => {
    const [star, setStar] = useState(3);
    const [description, setDescription] = useState("")
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const { user } = useAppSelector(state => state.auth)
    const dispatchAlert = useAlertDispatch()

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (selectedImages.length >= 3) {
            dispatchAlert({ errors: "Chỉ được phép đánh giá tối đa 3 ảnh" })
            return
        }
        const files = e.target.files
        if (files && files.length > 0) {
            const file = files[0];
            if (checkImage(file).length > 0) {
                dispatchAlert({ errors: checkImage(file) })
                return
            }
            else {
                setSelectedImages(prev => { return [...prev, file] })
            }
        }
    }

    const deleteImage = (image: File) => {
        if (image) {
            const newSelectedImage = selectedImages.filter(i => i.name !== image.name)
            setSelectedImages(newSelectedImage)
        }
    }

    const submitReview = async () => {
        dispatchAlert({ loading: true })
        try {
            const uploadPromises = selectedImages.map(async (imageFile) => {
                const res = await imageUpload(imageFile);
                return res.url;
            });
            const uploadedImageUrls = await Promise.all(uploadPromises);
            const data = { description, product_id: product.id, star, user_id: user?.id, images: uploadedImageUrls } as ReviewInterface
            const res = await ReviewService.createReview(data)
            dispatchAlert({ loading: false })
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='border-2 border-border-color p-10 mt-10'>
            <div className="flex gap-5 pb-4">
                <span className="text-black">Chọn đánh giá của bạn</span>
                <Rate onChange={setStar} value={star} />
            </div>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleChangeImage}
                className='mb-2'
            />
            <div className='flex gap-3'>
                {selectedImages.map((image, index) => (
                    <div key={index} >
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index}`}
                            className="max-h-[100px] cursor-zoom-in hover:opacity-70"
                            onClick={() => handlePreviewImage(URL.createObjectURL(image))}
                        />
                        <div className='cursor-pointer transform hover:scale-125 mx-auto mt-2 w-fit' >
                            <DeleteOutlined className='text-red-500 text-xl' onClick={() => deleteImage(image)} />
                        </div>
                    </div>
                ))}
            </div>
            <textarea
                placeholder="Nội dung"
                className="w-full min-h-[100px] px-[13px] py-[7px] border border-main-orange-color rounded mt-2"
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
            <button className='mt-4 w-full bg-main-orange-color py-2 hover:shadow-checkout-btn' onClick={submitReview}>
                <span className='text-white font-semibold tracking-wide'>Đánh giá</span>
            </button>
        </div>
    )
}

export default ReviewContainer