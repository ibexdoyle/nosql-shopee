import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'
import Star from '../../assets/image/icon/star.png'
import FormatNumber from '../../utils/FormatNumber'
import { NextArrow, PrevArrow } from "../../components/Arrows/Arrows"
import Slider from "react-slick";
import { Divider } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { toast } from 'react-toastify';
import { fetchProductById } from "../../services/ProductService";

const sliderSettings = {
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  focusOnSelect: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const ProductDetail = () =>{
    const sliderRef = useRef(null);
    const {id} = useParams();
    const { addItem } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [activeImage, setActiveImage] = useState(()=>{
        if (Array.isArray(product?.images) && product.images.length > 0) {
            return product.images[0];
        }
        return product?.image || '';
    });

    const handleThumbnailClick = (img, index) => {
        setActiveImage(img);
        sliderRef.current?.slickGoTo(index); 
    };

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = async () => {
        if (!user) {
            navigate("/auth"); 
            return;
        }
        try {
            setLoading(true);
            await addItem(product.id, quantity); 
            toast.success("Đã thêm vào giỏ hàng!");
        } catch (err) {
            console.error("Thêm vào giỏ hàng lỗi:", err);
            toast.error("Không thể thêm vào giỏ hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
            const found = await fetchProductById(id); 
            setProduct(found);
            if (found?.images?.length > 0) {
                setActiveImage(found.images[0]);
            } else {
                setActiveImage("https://via.placeholder.com/400x400?text=No+Image");
            }
            } catch (err) {
            console.error("Không tìm thấy sản phẩm:", err);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p className="p-4 text-[2rem]">Không tìm thấy sản phẩm</p>;
    return(
        <div>
            <Header/>
            <div className="flex gap-10 max-w-[1200px] mx-auto bg-white p-5 rounded-sm mt-3">
                <div>
                    <img src={activeImage} alt="main" className="w-[450px] h-[430px] object-contain rounded" />
                    <div className="group relative">
                        <Slider ref={sliderRef} {...sliderSettings} className="mt-2 max-w-[420px]">
                            {product.images.map((img, index) => (
                            <div key={index} onClick={() => handleThumbnailClick(img, index)} className="px-1 cursor-pointer">
                                <img src={img} alt={`thumb-${index}`} className={`w-20 h-20 object-cover border-2 p-1 rounded ${
                                    img === activeImage ? "border-mint" : "border-transparent" }`}/>
                            </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl">{product.name}</h1>
                    <div className="flex gap-3 text-sm items-center">
                        <span className="text-xl">{product.rating} <img src={Star} className="inline-block w-4" alt="star"/> <img src={Star} className="inline-block w-4" alt="star"/><img src={Star} className="inline-block w-4" alt="star"/><img src={Star} className="inline-block w-4" alt="star"/><img src={Star} className="inline-block w-4" alt="star"/></span>
                        <span>|</span>
                        Đã bán<span className="text-xl">{FormatNumber(product.sold)} </span> 
                    </div>
                        
                    <div className="bg-gray-50 p rounded space-y-1">
                        <div className="text-emerald-green text-3xl font-bold flex items-center">
                            ₫{product.salePrice.toLocaleString("vi-VN")}
                            <span className="text-smoke line-through text-base ml-2 mr-2">
                            ₫{product.originalPrice.toLocaleString("vi-VN")}
                            </span>
                            {product.originalPrice > product.salePrice && (
                                <span className='bg-mint text-emerald-green text-[0.75rem] px-1 py-0.5 rounded-sm '>
                                    -{Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}%
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm mt-2">
                        <span>Số lượng:</span>
                        <div className="flex items-center border border-smoke rounded">
                            <button className="w-8 text-center" onClick={handleDecrease} disabled={quantity === 1}>-</button>
                            <input type="number" value={quantity} readOnly className=" text-emerald-green w-12 h-8 text-center border-x border-smoke" />
                            <button className="w-8 text-center" onClick={handleIncrease}>+</button>
                        </div>
                        <span>{product.quantity} sản phẩm có sẵn</span>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button className="border border-mint text-mint px-6 py-2 rounded" onClick={handleAddToCart}>
                            <i class="fi fi-sr-shopping-cart mr-3"></i>Thêm vào giỏ
                        </button>
                            
                        <button className="bg-emerald-green text-white px-6 py-2 rounded">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>  
            <div className="max-w-[1200px] mx-auto bg-white p-5 rounded-sm mt-5">
                <h2 className="text-emerald-green font-bold text-[1.5rem]">MÔ TẢ SẢN PHẨM</h2>
                <Divider/>
                <div className="mt-4">{product.description.split('\n').map((line, index) => (
                        <p key={index} className="mb-2">{line}</p>
                    ))}
                </div>
            </div>      
        </div>
        
    );
}

export default ProductDetail;