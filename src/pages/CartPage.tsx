import CartModal from "../components/cart/CartModal"
import { useNavigate } from "react-router-dom"


const CartPage = () => {
    const navigate = useNavigate();
    return (
        <CartModal onClose={() => navigate(-1)} />
    )
}

export default CartPage
