import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import SearchResult from './pages/SearchResult/SearchResult';
import Auth from './pages/Auth/Auth';
import UserProfile from './pages/UserProfile/UserProfile';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart' 
import Checkout from './pages/Checkout/Checkout';
import SellerRegister from './pages/SellerRegister/SellerRegister';
import SellerDashboard from './pages/SellerDashboard/SellerDashboard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/become-seller" element={<SellerRegister/>}/>
        <Route path="/seller" element={<SellerDashboard/>}/>
      </Routes>
    </Router>

  );
}

export default App;
