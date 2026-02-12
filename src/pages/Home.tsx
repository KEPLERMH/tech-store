import { useEffect, useMemo, useState } from "react"
import { getProducts } from "../services/productApi"
import { useForm } from "react-hook-form"
import type { Product } from "../types/product"
import type { FiltersForm } from "../types/filters"

import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { register, watch } = useForm<FiltersForm>({ defaultValues: { category: "", search: "", order: "default" } })
    const { category, search, order } = watch();


    useEffect(() => {
        getProducts()
            .then(data => setProducts(data.products))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!products.length) return
        const uniqueCategory: string[] = [
            ...new Set(products.map(p => p.category))
        ];
        setCategories(uniqueCategory);
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = products.filter(p => {
            const matchCategory = category ? p.category === category : true;
            const matchSearch = search ? p.title.toLowerCase().includes(search.toLowerCase()) : true
            return matchCategory && matchSearch;

        });

        if (order === "asc") {
            result = [...result].sort((a, b) => a.price - b.price);
        }

        if (order === "desc") {
            result = [...result].sort((a, b) => b.price - a.price);
        }
        setCurrentPage(1)
        return result;
    }, [products, category, search, order])

    if (loading) return <p>cargando...</p>
    if (error) return <p>Error: {error}</p>

    const ITEMS_PER_PAGE: number = filteredProducts.length <= 8 ? filteredProducts.length : 8;//5
    const totalPages: number = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);//1

    const startIndex: number = (currentPage - 1) * ITEMS_PER_PAGE;//5
    const endIndex: number = startIndex + ITEMS_PER_PAGE;
    const visibleProducts = filteredProducts?.slice(startIndex, endIndex);

    return (
        <div className=' space-y-7 my-6 px-4 xl:px-30'>
            <Filters categories={categories} register={register} />
            <div className='flex flex-col gap-6'>

                <div className=" border py-2 px-5 rounded-xl flex gap-2 items-center justify-between">
                    <p className="text-sm">Mostrando <span className="font-semibold">{visibleProducts?.length}</span> de <span className="font-semibold">{filteredProducts?.length}</span> productos</p>

                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className=' text-[16px] text-gray-600 font-semibold bg-gray-200 rounded-lg px-5 py-2 cursor-pointer disabled:opacity-50   disabled:cursor-not-allowed'
                        >Anterior</button>

                        <p className="flex flex-wrap items-center justify-center gap-0.5">Pagina <span className="font-semibold">{currentPage}</span>de <span className="font-semibold">{totalPages}</span> </p>

                        <button
                            onClick={() => setCurrentPage(p => p + 1)}
                            disabled={endIndex >= filteredProducts?.length}
                            className='text-[16px] text-gray-600 font-semibold bg-gray-200 rounded-lg px-5 py-2 cursor-pointer disabled:opacity-50   disabled:cursor-not-allowed'
                        >Siguiente</button>
                    </div>
                </div>

                <div className='grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'>
                    {
                        visibleProducts.map(product => <ProductCard key={product.id} product={product} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
