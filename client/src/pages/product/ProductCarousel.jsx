import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TruncateText from "services/TruncateText";
import "./ProductCarousel.scss"

const ProductCarousel = () => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([])
    const [selectCategory, setSelectCategory] = useState(1);

    useEffect(() => {

        const showCategory = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/user/showCategory")
                setCategory(response.data);
            } catch (error) {
                console.log("lỗi show category", error);
            }
        }
        showCategory();
    }, [setSelectCategory])
    useEffect(() => {
        const ShowProductCarousel = async () => {
            try {
                console.log(selectCategory);

                const response = await axios.get(`http://localhost:8080/api/user/showProductByCategory/${selectCategory}`)
                setProducts(response.data);
            } catch (error) {
                console.log("loi show product", error);
            }
        }
        ShowProductCarousel()
    }, [selectCategory])
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectCategory(categoryId ? categoryId : 1);
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
    };
    return (<>
    <div>
        <div><h2 className="textname">Sản phẩm theo loại</h2></div>
        <div className="container">

            <select
                className="form-control cbb"
                onChange={handleCategoryChange}
            >
                {category.map((item) => (
                    <option key={item.id} value={item.categoryId}>{item.name}</option>
                ))}
            </select>
        </div>
        <Slider {...settings}>
            {products.map((product, index) => (
                <div key={index} className="text-center" >
                    <div className="textproduct text-center"> <TruncateText text={product.name} maxLength={20} />  </div>
                    <img src={`http://localhost:8080/getimage/${product.image}`} alt="" style={{ height: "365px", width: "310px" }} />
                    <div>
                        <p className="price mt-3">Giá hiện tại: {formatCurrency(product.unitPrice * (100 - (product.discount)) / 100)}</p><s className='giaGoc'>Giá gốc: {formatCurrency(product.unitPrice)} </s>
                    </div>
                </div>
            ))}
        </Slider>
        </div>
    </>)
}

export default ProductCarousel; 