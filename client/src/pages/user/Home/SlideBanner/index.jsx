// import { getProducts } from "apis/product";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import banner1 from "assets/banner1.png";
import banner2 from "assets/banner2.jpg";
import banner3 from "assets/banner3.png";

const settingSlider = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad: "ondemand",
    pauseOnHover: true,
};

function SlideBanner() {
    return (
        <div className="border-2 rounded p-2 h-full bg-orange-200">
            <div className="mt-4 flex flex-col gap-2">
                <Slider className="product-slider" {...settingSlider}>
                    <img
                        src={banner1}
                        alt=""
                        className="h-[400px] object-cover "
                    />
                    <img
                        src={banner2}
                        alt=""
                        className="h-[400px] object-cover "
                    />
                    <img
                        src={banner3}
                        alt=""
                        className="h-[400px] object-cover "
                    />
                </Slider>
            </div>
        </div>
    );
}

export default SlideBanner;
