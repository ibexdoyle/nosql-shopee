import Slider from 'react-slick';
import { promoSlide } from './mock_promo_slider';
import PromoBanner from '../../assets/image/product-promo/banner-promo.png';

const PromoDealSection = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
      <div className="flex gap-4">
        {/* Banner bên trái */}
        <div className="w-1/3">
          <img src={PromoBanner} alt="Deal banner" className="w-full rounded-md" />
        </div>

        {/* Slide bên phải */}
        <div className="w-2/3 overflow-hidden">
          <Slider {...settings}>
            <div>
              <div className="grid grid-cols-4 gap-y-5">
                {promoSlide.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <img src={item.image} alt={item.promo} className="h-3/4 w-3/4 object-contain" />
                    <p className="text-emerald-green font-semibold text-2xl">{item.promo}</p>
                  </div>
                ))}
              </div>
            </div>
          </Slider>
        </div>
      </div>
  );
};

export default PromoDealSection;
