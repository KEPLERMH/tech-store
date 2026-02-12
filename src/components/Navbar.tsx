import { ShoppingCart, Store } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = useCart();
    const totalItems = state.items.reduce((acc, item) => { return acc + item.quantity }, 0);

    return (
        <header className=" sticky top-0 z-10  p-4 shadow-lg xl:px-30 bg-white">
            <nav className=" flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary-blue p-2 rounded-xl">
                        <Store className="text-white w-7 h-7" />
                    </div>
                    <div className="">
                        <h1 className="font-semibold text-xl">TechStore</h1>
                        <p className="text-sm text-gray-600 ">Tu tienda de tecnología</p>
                    </div>
                </div>

                {/* boton de ver carrito */}
                <button
                    className="relative bg-primary-blue flex items-center gap-1 px-5 py-3 rounded-2xl cursor-pointer text-white hover:bg-primary-blue-hover "
                    onClick={() => navigate("/cart", { state: { background: location } })}
                >
                    <ShoppingCart />

                    <span className="font-semibold">Carrito</span>

                    {
                        totalItems > 0 && (<span className=" absolute -right-2 -top-3 rounded-full bg-red-500 w-6 h-6 flex items-center justify-center text-xs font-semibold " aria-hidden="true">{totalItems}</span>)
                    }
                </button>
            </nav>
        </header>
    )
}

export default Navbar
