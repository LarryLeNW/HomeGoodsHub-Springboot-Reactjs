import lable from "assets/label.png";
// import SelectOption from "./SelectOption";
import ICONS from "utils/icons";
import { useState } from "react";
import { formatMoney, renderStars } from "utils/helper";
import { generatePath } from "react-router-dom";
import withBaseComponent from "hocs";
// import { showModal } from "redux/slicers/common.slicer";
import QuickViewProduct from "components/Modal/QuickViewProduct";
// import { updateCartRequest } from "redux/slicers/auth.slicer";
import { notification } from "antd";
import paths from "constant/path";
import SelectOption from "components/SliderCustom/SelectOption";
import { useAuthStore } from "store/auth.store";
import { addCart } from "apis/cart";
import { useCommonStore } from "store/common.store";
import { useCartStore } from "store/cart.store";

function Product({
    data,
    titleLabel,
    checkLoginBeforeAction,
    style,
    navigate,
}) {
    const [isShowOption, setShowOption] = useState(false);
    const { userInfo } = useAuthStore();
    const { showModal } = useCommonStore();
    const { addCartRequest, fetchCarts } = useCartStore();

    const handleClickOptions = (e, type) => {
        e.stopPropagation();
        switch (type) {
            case "AddCart":
                if (!userInfo.data) {
                    notification.warning({
                        message:
                            "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
                        duration: 1,
                    });
                    return;
                }
                addCartRequest(data.productId, userInfo.data.userId, 1, () => {
                    fetchCarts(userInfo.data?.userId);
                });
                break;
            case "QuickView":
                showModal({
                    isShowModal: true,
                    children: <QuickViewProduct productData={data} />,
                });
                break;
            case "WishList":
                console.log("WishList");
                break;
        }
    };

    return (
        <div className={"w-full text-base mx-2 pr-5 px-2"}>
            <div
                className="w-full border p-[15px] flex flex-col items-center cursor-pointer bg-gray-300"
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    setShowOption(true);
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    setShowOption(false);
                }}
                onClick={() =>
                    navigate(
                        generatePath(paths.DETAIL_PRODUCT, {
                            category: data?.category.name,
                            id: data?.productId,
                            title: data?.name,
                        })
                    )
                }
            >
                <div className="w-full relative ">
                    {isShowOption && (
                        <div className="absolute bg-[rgba(0,0,0,0.2)]  bottom-[-10px] left-0 right-0 flex gap-2 justify-center animate-slide-top animate-slide-topsm">
                            <span
                                title="Quick View"
                                onClick={(e) =>
                                    handleClickOptions(e, "QuickView")
                                }
                            >
                                <SelectOption icon={<ICONS.AiFillEye />} />
                            </span>
                            <span
                                title="Add to cart"
                                onClick={(e) =>
                                    handleClickOptions(e, "AddCart")
                                }
                            >
                                <SelectOption
                                    icon={
                                        // userInfo.data?.cart?.some(
                                        //     (el) => el.product == data?._id
                                        // ) ? (
                                        // <ICONS.BsFillCartCheckFill color="green" />
                                        // ) : (
                                        <ICONS.FaCartArrowDown />
                                        // )
                                    }
                                />
                            </span>
                            <span
                                title="Add wishlist"
                                onClick={(e) =>
                                    handleClickOptions(e, "WishList")
                                }
                            >
                                <SelectOption
                                    icon={<ICONS.BsFillSuitHeartFill />}
                                />
                            </span>
                        </div>
                    )}
                    <img
                        src={
                            data?.thumb ||
                            "https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg"
                        }
                        alt={data.title}
                        className="w-full h-[200px]  object-cover rounded"
                    />
                    <img
                        src={lable}
                        alt="lable"
                        className={`absolute top-[-24px] left-[-38px] h-[60px] object-cover "w-[150px]"}`}
                    />
                    <span className="text-sm absolute -rotate-12 top-[-4px] font-semibold left-[-12px] text-orange-600">
                        {titleLabel}
                    </span>
                </div>
                {/* info */}
                <div className="flex flex-col gap-2 mt[15px] items-start w-full">
                    <span className="line-clamp-1">{data?.name}</span>

                    <span className="flex ">
                        {renderStars(5).map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                    </span>
                    <span>{formatMoney(data?.unitPrice)} VNĐ</span>
                </div>
            </div>
        </div>
    );
}

export default withBaseComponent(Product);
