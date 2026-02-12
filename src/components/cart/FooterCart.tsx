import { useCart } from "../../context/CartContext"
const FooterCart = () => {
    const { state, dispatch } = useCart();
    const subTotal = state.items.reduce((acc, item) => (acc + item.price * item.quantity), 0)
    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl">Subtotal</p>
                <p className="text-2xl text-primary-blue">$ {subTotal.toFixed(2)}</p>
            </div>
            <div className="border flex gap-5 text-white">
                <button onClick={() => dispatch({ type: "EMPTY" })} className=" flex-1 border border-gray-400 text-black rounded-xl py-1.5 font-medium hover:bg-gray-200 cursor-pointer" >Vaciar carrito</button>
                <button className="flex-1 border rounded-xl py-1.5 font-medium bg-primary-blue hover:bg-primary-blue-hover cursor-pointer">Proceder al pago</button>
            </div>
        </>
    )
}

export default FooterCart
