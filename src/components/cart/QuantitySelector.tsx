import { useState } from "react"
import { useCart } from "../../context/CartContext"

type QuantityProp = {
    idItem: number;
}
const QuantitySelector = ({ idItem }: QuantityProp) => {
    const { state, dispatch } = useCart();
    const item = state.items.find(item => item.id === idItem);
    const count = item ? item.quantity : 0;
    return (
        <div className="flex border border-gray-400 rounded-lg overflow-hidden">
            <button type="button" onClick={() => dispatch({ type: "DECREMENT", payload: idItem })} disabled={count === 1} className="px-1 w-7 text-2xl cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in disabled:cursor-no-drop disabled:bg-gray-200">-</button>

            <input type="text" value={count} readOnly className=" w-20 text-center pointer-events-none outline-none" />

            <button type="button" onClick={() => dispatch({ type: "INCREMENT", payload: idItem })} className="px-1 w-7 text-2xl cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in">+</button>
        </div>
    )
}

export default QuantitySelector
