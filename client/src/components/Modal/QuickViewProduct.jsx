import { notification } from "antd";
import Button from "components/Form/Button";
import SelectQuantity from "components/Form/SelectQuantity";
import DOMPurify from "dompurify";
import withBaseComponent from "hocs";
import { useCallback, useState } from "react";
import Slider from "react-slick";
import { useAuthStore } from "store/auth.store";
import { useCartStore } from "store/cart.store";
import { formatMoney, renderStars } from "utils/helper";

function QuickViewProduct({ productData }) {
    const [quantity, setQuantity] = useState(1);
    const { userInfo } = useAuthStore();
    const { addCartRequest, fetchCarts } = useCartStore();

    const handleQuantity = useCallback(
        (input) => {
            if (!Number(input) || Number(input) < 1) return;
            setQuantity(+input);
        },
        [quantity]
    );

    const handleClickQuantity = (flag) => {
        if (flag == "minus") {
            if (quantity <= 1) return;
            setQuantity((prev) => prev - 1);
        }
        if (flag == "plus") {
            if (quantity > productData.quantity) return;
            setQuantity((prev) => prev + 1);
        }
    };

    const handleAddProductToCart = () => {
        if (!userInfo.data) {
            notification.warning({
                message: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
                duration: 1,
            });
            return;
        }
        addCartRequest(
            productData.productId,
            userInfo.data.userId,
            quantity,
            () => {
                fetchCarts(userInfo.data?.userId);
            }
        );
    };

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="w-[50%] flex flex-col justify-center items-center  bg-white rounded  z-40 border-main border p-4 gap-2 text-black "
        >
            <div className="w-full m-auto bg-white flex">
                {/* image product review */}
                <div className="w-1/2 ">
                    <div className=" h-[280px] flex justify-center items-center w-full">
                        {productData?.thumb && (
                            <img
                                src={productData?.thumb}
                                alt="sub-img"
                                className=" w-full h-full object-contain "
                            />
                        )}
                    </div>
                    <div className="w-full">
                        <Slider
                            {...{
                                infinite: true,
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 2000,
                                pauseOnHover: true,
                            }}
                            className="image-slider"
                        >
                            {productData?.images?.split(",")?.map((el) => (
                                <div className="p-2  w-1/3 " key={el}>
                                    <img
                                        src={el}
                                        alt="sub-img"
                                        className=" h-[143px] w-full border object-contain "
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* info product */}
                <div className="w-1/2  p-4">
                    <div className="flex justify-between">
                        <h2 className="text-[30px] font-semibold ">
                            {formatMoney(productData?.unitPrice)} VNĐ
                        </h2>
                        <span className="text-yellow-600">
                            Còn {productData?.quantity} cái
                        </span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="flex">
                            {renderStars(5).map((el, index) => (
                                <span key={index}>{el}</span>
                            ))}
                        </div>
                        <span className="text-red-400">
                            (Đã bán {productData?.sold} cái)
                        </span>
                    </div>
                    <ul className="p-2 text-gray-500 ">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    productData?.description
                                ),
                            }}
                        ></div>
                    </ul>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold">Quantity : </span>
                            <SelectQuantity
                                quantity={quantity}
                                handleQuantity={handleQuantity}
                                handleClickQuantity={handleClickQuantity}
                            />
                        </div>
                        <Button
                            name={"Add to cart"}
                            fw={true}
                            handleClick={handleAddProductToCart}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withBaseComponent(QuickViewProduct);
