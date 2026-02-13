import { ShoppingBag } from "lucide-react"
import CartItem from "./CartItem"
import HeaderCart from "./HeaderCart"
import FooterCart from "./FooterCart"
import { useCart } from "../../context/CartContext"

type cartModalProp = {
    onClose: () => void
}

const CartModal = ({ onClose }: cartModalProp) => {
    const { state } = useCart();//{items:[{imge},{},{}]}
    const arrayLength = state.items.length;
    return (
        <div className=" fixed inset-0 z-40 flex justify-center items-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose}>
            </div>
            <section className="mx-5 my-10 z-50 min-w-[390px] w-full max-w-2xl max-h-[80vh] rounded-2xl overflow-hidden flex flex-col">
                <header className=" shrink-0 p-5 text-white bg-primary-blue flex justify-between items-center">
                    <HeaderCart onClose={onClose} />
                </header>
                <main className="border py-1 bg-white min-h-44 max-h-[284px] overflow-y-auto ">
                    {
                        arrayLength === 0 && (
                            <div className=" text-gray-400 h-48 flex  gap-2 flex-col justify-center items-center">
                                <ShoppingBag className="w-15 h-15 text-gray-300" />
                                <p className="font-semibold">Tu Carrito esta vacio</p>
                                <p className="text-sm">Agrega productos para comensar</p>
                            </div>
                        )
                    }

                    <ul className=" p-5 flex flex-col gap-4 ">
                        {
                            state.items.map(item => <CartItem key={item.id} item={item} />)
                        }
                    </ul>
                </main>

                {
                    arrayLength > 0 && (
                        <footer className=" shrink-0 space-y-3 p-5 bg-gray-50 border-t border-gray-200">
                            <FooterCart />
                        </footer>
                    )
                }

            </section>
        </div>
    )
}

export default CartModal
