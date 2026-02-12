import { Trash2 } from 'lucide-react'
import QuantitySelector from './QuantitySelector'
import { useCart } from "../../context/CartContext"


interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
}

type CartItemProduct = {
    item: CartItem
}

const CartItem = ({ item }: CartItemProduct) => {
    const { dispatch } = useCart();
    return (
        <li className="border border-gray-300 rounded-lg bg-gray-50 p-4 flex justify-between">
            <div className="flex gap-2">
                <figure className="w-20 h-20 border">
                    <img src={item.image} alt="" className="w-full h-full object-contain" />
                </figure>
                <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-gray-500">{item.category}</p>
                    <p className="text-primary-blue ">$ {item.price}</p>
                </div>
            </div>

            <div className="flex flex-col justify-evenly items-end">
                <Trash2 className="w-5 h-5 text-red-600 cursor-pointer" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })} />
                <QuantitySelector idItem={item.id} />
            </div>
        </li>
    )
}

export default CartItem
