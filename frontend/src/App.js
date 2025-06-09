import Auth from './pages/Auth/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import SearchResult from './pages/SearchResult/SearchResult';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </Router>

  );
}

export default App;
