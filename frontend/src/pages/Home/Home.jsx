import Header from "../../components/Header/Header"
import Banner from "../../assets/image/banner.png"
import SubBanner1 from "../../assets/image/sub-banner-1.png"
import SubBanner2 from "../../assets/image/sub-banner-2.png"
import Voucher from "../../assets/image/shortcut-voucher.png"
import Member from "../../assets/image/shortcut-member.png"
import Choice from "../../assets/image/shortcut-choice.png"
import Coin from "../../assets/image/shortcut-coin.png"
import categories from "./data/mock_home_category"
import CountdownTimer from "../../utils/Countdown"
import { sale_products } from "./data/mock_home_sale_product"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../../components/Arrows/Arrows"
import PromoSection from "../../components/PromoSection/PromoSection"
import {UndoRounded, GppGood, LocalShipping} from '@mui/icons-material'


const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2
      }
    }
  ]
};

const shortcuts = [
  { label: 'Mã Giảm Giá', icon: Voucher },
  { label: 'Khách Hàng Thân Thiết', icon: Member },
  { label: 'Hàng Chọn Giá Hời', icon: Choice},
  { label: 'Shopii Style', icon: Member },
  { label: 'Shopii Mall', icon: Choice },
  { label: 'Săn Ngay 100.000 Xu', icon: Coin },
];

const Home = () =>{
    const now = new Date();
    const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    return(
        <div className="container">
            <Header/>

            <div className="bg-white py-3">
                <div className="max-w-6xl mx-auto mt-3 banner-section flex flex-col md:flex-row gap-4">
                    <div className="main-banner md:w-2/3">
                        <img src={Banner} alt="banner" className="rounded-sm"/>
                    </div>
                    <div className="sub-banner md:w-1/3 flex flex-col gap-4">
                        <img src={SubBanner1} alt="sub-banner-1" className="rounded-sm"/>
                        <img src={SubBanner2} alt="sub-banner-2" className="rounded-sm"/>
                    </div>
                </div>
                <div className="max-w-[1200px] mx-auto flex justify-around gap-4 text-center mt-5">
                    {shortcuts.map((item, idx)=>(
                        <div key={idx} className="flex flex-col items-center hover:translate-y-1 cursor-pointer">
                            <img src={item.icon} alt={item.label} className="w-12 h-12"/>
                            <span className="text-sm w-3/4">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="category mt-5">
                <div className="max-w-[1200px] mx-auto bg-white p-5 rounded-sm">
                    <h2 className="text-lg font-semibold mb-4 text-emerald-green">DANH MỤC</h2>
                    <div className="grid grid-cols-4 md:grid-cols-10 text-center">
                        {categories.map((category, idx)=>(
                            <div key={idx} className="flex flex-col items-center hover:bg-grey p-2 cursor-pointer">
                                <img src={category.image} alt={category.label} className="w-14 h-14 object-cover"/>
                                <span className="text-sm">{category.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flash-sale mt-5">
                <div className="max-w-[1200px] mx-auto bg-white p-5 rounded-sm">
                    <div className="title flex justify-between">
                        <div className="flex gap-4">
                            <h2 className="text-emerald-green font-bold text-2xl">FLASH SALE</h2>
                            <CountdownTimer targetTime={endTime}/>
                        </div>
                        <a href="#" className="text-emerald-green hover:underline">Xem tất cả &#62;</a>
                    </div>
                    <div className="sale-product py-6">
                        <Slider {...sliderSettings}>
                            {sale_products.map((product) => (
                            <div key={product.id} className="px-2">
                                <div className="bg-white rounded-md shadow-sm overflow-hidden relative transition hover:shadow-md">

                                    <div className="absolute bg-[#3EBB9E] text-sm text-white font-semibold px-1 py-1 border border-[#3EBB9E] rounded">
                                    -{product.discount}%
                                    </div>

                                    <div className="aspect-w-1 aspect-h-1 p-3">
                                        <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
                                    </div>

                                    <div className="text-center pb-3">
                                        <p className="text-emerald-green font-semibold text-xl">
                                            ₫{product.price.toLocaleString("vi-VN")}
                                        </p>
                                        
                                        <div className="mt-2 inline-block px-3 py-1 bg-gradient-to-r from-emerald-green to-[#3EBB9E] text-white text-sm rounded-full">
                                            {product.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

            <div className="promo max-w-[1200px] mx-auto bg-white p-5 mt-6 rounded-sm">
                <div className="promo-title flex">
                    <div className="flex gap-2">
                        <h2 className="font-semibold text-2xl text-emerald-green">Shopii Mall</h2>
                        <span className="text-grey">|</span>
                        <div className="flex gap-1 mr-2">
                            <UndoRounded className="text-white bg-emerald-green rounded-full p-1"/>
                            <p>Trả hàng Miễn phí 15 ngày</p>
                        </div>
                        <div className="flex gap-1 mr-2">
                            <GppGood className="text-white bg-emerald-green rounded-full p-1"/>
                            <p>Hàng chính hãng 100%</p>
                        </div>
                        <div className="flex gap-1">
                            <LocalShipping className="text-white bg-emerald-green rounded-full p-1"/>
                            <p>Miễn phí vận chuyển</p>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-grey rounded-full mb-3"></div>
                <PromoSection/>
            </div>
        </div>
    )
}
export default Home;
