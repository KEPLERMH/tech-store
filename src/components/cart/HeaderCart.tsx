import { ShoppingBag, X } from "lucide-react"
import { useCart } from "../../context/CartContext"
type HeaderCartProp = {
    onClose: () => void
}
const HeaderCart = ({ onClose }: HeaderCartProp) => {
    const { state } = useCart();
    const totalItems = state.items.length;
    return (
        <>
            <div className="flex items-center gap-3">
                <ShoppingBag className="w-7 h-7" />
                <div>
                    <h1 className="text-2xl font-medium">Carrito de Compras</h1>
                    <p className="text-sm"><span>{totalItems} </span>productos</p>
                </div>
            </div>
            <div className="p-2 rounded-full hover:bg-white/20 cursor-pointer" onClick={onClose}>
                <X className="w-6 h-6 font-semibold" />
            </div>
        </>
    )
}

export default HeaderCart
