import ProductModal from "../components/ProductModal"
import { useNavigate, useParams } from "react-router-dom"

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <ProductModal productId={id!} onClose={() => navigate(-1)} />
    )
}

export default ProductDetail
