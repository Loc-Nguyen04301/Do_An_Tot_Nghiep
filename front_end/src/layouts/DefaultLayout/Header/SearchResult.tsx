import React, { useEffect, useState } from 'react'
import {
    useSearchContext
} from '@/contexts/SearchContext'
import ProductService from '@/services/ProductService'
import { IProduct } from '@/types';
import { convertNumbertoMoney } from '@/utils';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/routes';

interface SearchResultProps {
    loading?: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchResult = ({ setLoading }: SearchResultProps) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { search } = useSearchContext()

    const getProductsByName = async (name: string) => {
        try {
            if (name.length >= 1) {
                const res = await ProductService.getProductsByName(name)
                setProducts(res.data.data)
            }
            else {
                setProducts([])
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            getProductsByName(search)
        }, 1200);

        return () => clearTimeout(timer);
    }, [search])

    return (
        <div className="absolute left-0 w-full z-[10]" id="search-result">
            <div className="max-h-[80vh] bg-white shadow-search-box overflow-y-auto">
                <ul className="h-full">
                    {products.map((product) =>
                        <Link
                            key={product.id}
                            to={`${RoutePath.DetailProduct}/${product.id}`}
                            className="p-3 flex items-center justify-between hover:bg-[#f7f7f7] hover:cursor-pointer border-b-[1px] gap-2"
                        >
                            <div className="flex items-center gap-5">
                                <img src={product.image} width={50} />
                                <span>{product.name}</span >
                            </div>
                            <span>
                                <strong>
                                    {convertNumbertoMoney(product.new_price)}
                                </strong>
                            </span>
                        </Link>)}
                </ul>
            </div>
        </div>
    )
}

export default SearchResult