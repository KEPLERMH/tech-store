import { Package, Shield, ShoppingCart, Van, X } from "lucide-react"
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import type { ModalProductProp } from "../types/productModal";
import { getProducById } from "../services/productApi";
import { useCart } from "../context/CartContext";


const ProductModal = ({ productId, onClose }: ModalProductProp) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { dispatch } = useCart();

    useEffect(() => {
        const fechProduct = async () => {
            try {
                setError(null);
                setLoading(true)
                const data = await getProducById(productId);
                setProduct(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error inesperado")
            } finally {
                setLoading(false)
            }
        }
        fechProduct();
    }, [productId]);


    if (error) return <p>Error: {error}</p>;
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center ">

            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />


            <section className="relative mx-4 bg-white w-full  m-1 rounded-xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="shrink-0 border-b border-gray-400/50 flex justify-between  p-6">
                    <h2 className="text-2xl font-medium">Detalle del producto</h2>
                    <button className="cursor-pointer" onClick={onClose}>
                        <X />
                    </button>
                </header>

                {loading && (
                    <div className="min-h-28 flex justify-center items-center">
                        <p className="text-xl text-primary-blue-text">Cargando...</p>
                    </div>
                )}

                {!loading && product && (
                    <div className="p-6 flex flex-col overflow-y-auto gap-8 md:flex-row">
                        <figure className="border border-gray-200/50 h-110 min-w-85 rounded-xl">
                            <img src={product.thumbnail} alt="prueba" className="w-full h-full object-contain" />
                        </figure>
                        <div className="space-y-3">
                            <div className="space-y-5">
                                <div className="">
                                    <span className="px-3 py-1 rounded-3xl bg-primary-blue-light text-primary-blue-text">laptops</span>
                                    <h2 className=" mt-2 font-semibold text-3xl">{product.title}</h2>
                                </div>
                                <p className="text-4xl text-primary-blue font-medium">${product.price}</p>
                                <p className="border-b border-gray-700/20 pb-6 text-gray-500">{product.description}</p>
                            </div>
                            <ul className="space-y-1.5">
                                <li className="flex gap-2 items-center"><div className="py-1 px-2 rounded-xl bg-green-100 text-green-600"><Van className="w-6 h-6" /></div><p className="text-sm">Envío gratis en compras mayores a $50</p></li>
                                <li className="flex gap-2 items-center"><div className="py-1 px-2 rounded-xl bg-primary-blue-light text-primary-blue-text"><Shield className="w-6 h-6" /></div><p className="text-sm">Garantía de 12 meses</p></li>
                                <li className="flex gap-2 items-center"><div className="py-1 px-2 rounded-xl bg-purple-100 text-purple-600"><Package className="w-6 h-6" /></div><p className="text-sm">En stock - Entrega en 2-3 días</p></li>
                            </ul>
                            <button className="py-4 rounded-xl text-white font-medium bg-primary-blue w-full flex items-center justify-center gap-3 cursor-pointer hover:bg-primary-blue-hover " onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id: product.id, title: product.title, price: product.price, image: product.thumbnail, category: product.category } })}><ShoppingCart />Agregar al carrito</button>
                        </div>
                    </div>
                )}


            </section>


        </div>
    )
}

export default ProductModal
