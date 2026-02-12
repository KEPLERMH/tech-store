import { ShoppingCart, View } from "lucide-react"
import type { Product } from "../types/product"
import { useCart } from "../context/CartContext"
import { Link, useLocation } from "react-router-dom"


type ProductData = Pick<
    Product,
    "id" | "title" | "price" | "thumbnail" | "category"
>

interface Props {
    product: ProductData
}



const ProductCard = ({ product }: Props) => {
    const { dispatch } = useCart();
    const location = useLocation();

    return (
        <article className="group border border-gray-200 rounded-xl overflow-hidden shadow-(--shadow-card) hover:shadow-xl transition-shadow  duration-300 ease-in">
            <figure className=" relative h-72 w-full bg-black/5 overflow-hidden">
                <img src={product.thumbnail} alt="nose" className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                {/* overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
            </figure>

            <div className="p-6 space-y-3">
                <div>
                    <h2 className="text-xl font-semibold">{product.title}"</h2>
                    <p className="mb-2 text-gray-500">{product.category}</p>
                    <span className=" text-2xl text-primary-blue">${product.price}</span>
                </div>
                <div className="flex justify-between gap-2">
                    <Link to={`/products/${product.id}`} state={{ background: location, overlayType: "dark" }} >
                        <button className=" flex items-center justify-center gap-2 py-2 px-2 rounded-xl cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors duration-300">
                            <View className="w-5 h-5" />
                            <span className="font-medium">Ver detalle</span>
                        </button>
                    </Link>
                    <button
                        type="button"
                        className=" text-white flex-1 flex items-center justify-center gap-2 rounded-xl cursor-pointer bg-primary-blue hover:bg-primary-blue-hover transition-colors duration-300"
                        onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id: product.id, title: product.title, price: product.price, image: product.thumbnail, category: product.category } })}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="font-medium">Agregar</span>
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard
