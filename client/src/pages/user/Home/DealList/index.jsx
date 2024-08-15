// import { getProducts } from "apis/product";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCustom from "components/SliderCustom";
import { getProducts } from "apis";
import Product from "./Product";
import Slider from "react-slick";

const settingSlider = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: "ondemand",
    touchMove: true,
    pauseOnHover: true,
};

function DealList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getProducts({
                    sortBy: "discount",
                    sortOrder: "desc",
                });
                setProducts(result.content);
            } catch (error) {
                console.log("🚀 ~ fetchProducts ~ error:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="border-2 rounded p-2">
            <h1 className="text-center text-main font-semibold text-lg border-b-2 border-main p-1">
                DEAL LIST TODAY
            </h1>

            <div className="mt-4 flex flex-col gap-2">
                <Slider className="product-slider" {...settingSlider}>
                    {products?.map((p, index) => (
                        <Product
                            key={index}
                            data={p}
                            titleLabel={`${p.discount} %`}
                        />
                    ))}
                </Slider>
                <hr />
                <Slider className="product-slider" {...settingSlider}>
                    {products?.map((p, index) => (
                        <Product
                            key={index}
                            data={p}
                            titleLabel={`${p.discount} %`}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default DealList;
