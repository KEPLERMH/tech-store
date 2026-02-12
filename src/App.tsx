import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";


function App() {

  function AppRoutes() {
    const location = useLocation();
    const background = location.state?.background;

    return (
      <>
        <Navbar />
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
        </Routes>
        {background && (
          <Routes>
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        )}
      </>
    )
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
