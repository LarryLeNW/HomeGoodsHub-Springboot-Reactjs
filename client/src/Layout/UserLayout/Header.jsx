import { generatePath, Link } from "react-router-dom";
import paths from "constant/path";
import logo from "assets/logo.png";
import { useClickOutside } from "hooks/useClickOutside";
import { renderStars } from "utils/helper";
import ICONS from "utils/icons";
import { Badge } from "antd";
import CartReview from "components/CartReview";
import Button from "components/Form/Button";
import withBaseComponent from "hocs";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/auth.store";
import { getProducts, logout } from "apis";
import useDebounce from "hooks/useDebounce";
import { useCartStore } from "store/cart.store";
import { useCommonStore } from "store/common.store";

function Header({ navigate }) {
    const { userInfo } = useAuthStore();
    const { fetchCarts, cart } = useCartStore();
    const { showModal } = useCommonStore();

    const [isShowMenuMember, setIsShowMenuMember] = useState(false);
    const [isModalSearch, setIsModalSearch] = useState(false);
    const [dataSearch, setDataSearch] = useState([]);
    const [keywords, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const keywordDebounce = useDebounce(keywords, 500);
    const menuRef = useClickOutside(() => {
        setIsShowMenuMember(false);
    });
    const searchModalRef = useClickOutside(() => {
        setIsModalSearch(false);
    });

    const { logoutRequest } = useAuthStore();

    useEffect(() => {
        if (userInfo.data) {
            fetchCarts(userInfo.data.userId);
        }
    }, [userInfo.data?.userId]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await getProducts({ keywords, limit: 5 });
                setDataSearch(response.content);
                setLoading(false);
                if (response.content.length > 0) {
                    setIsModalSearch(true);
                }
            } catch (error) {
                console.log("🚀 ~ fetchProduct ~ error:", error);
            }
        };
        if (keywords) fetchProduct();
        else {
            setDataSearch([]);
            setIsModalSearch(false);
        }
    }, [keywordDebounce]);

    return (
        <div className="w-main  flex justify-between mt-[48px] items-center h-[110px] py-[35px] select-none">
            <Link to={`${paths.HOME}`}>
                <img
                    src={logo}
                    alt="logo"
                    className="w-[140px] object-contain "
                />
            </Link>
            <div className="flex gap-2 border-2 border-blue-500 w-1/2 p-2 rounded relative">
                <input
                    type="text"
                    placeholder="Bạn tìm kiếm gì hôm nay ?"
                    className="flex-1 outline-none"
                    value={keywords}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="px-2 border-l-2">
                    {loading ? (
                        <ICONS.AiOutlineLoading3Quarters
                            size={20}
                            className="font-bold  animate-spin "
                        />
                    ) : (
                        <ICONS.IoIosSearch size={20} className="font-bold  " />
                    )}
                </div>
                {isModalSearch && (
                    <div
                        className="absolute w-full  border-2 bg-white rounded top-full p-2 h-fit z-30"
                        ref={searchModalRef}
                    >
                        <h1 className="border-b border-main font-bold">
                            Kết quả tìm kiếm :
                        </h1>
                        <div>
                            {dataSearch.map((product) => (
                                <Link
                                    key={product.productId}
                                    className="flex  gap-2 hover:bg-gray-100 px-2 py-2 cursor-pointer"
                                    to={generatePath(paths.DETAIL_PRODUCT, {
                                        category:
                                            product?.category.name.toLowerCase(),
                                        title: product?.name,
                                        id: product?.productId,
                                    })}
                                    onClick={() => setIsModalSearch(false)}
                                >
                                    <img
                                        src={product.thumb}
                                        alt=""
                                        className="w-[100px] h-[100px] object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-sm">
                                            {product.name}
                                        </h1>
                                        <span className="text-gray-500 text-sm">
                                            {product.unitPrice.toLocaleString(
                                                "vi-VN"
                                            )}{" "}
                                            VNĐ
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            Còn : {product.quantity} cái
                                        </span>
                                        <span className="flex h-4">
                                            {renderStars(5, 14).map(
                                                (el, index) => (
                                                    <span key={index}>
                                                        {el}
                                                    </span>
                                                )
                                            )}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {userInfo?.data ? (
                <div className="flex text-[13px] gap-4">
                    <div
                        className="flex items-center justify-center gap-2 border-r px-6 cursor-pointer border"
                        onClick={() =>
                            showModal({
                                children: <CartReview />,
                                isShowModal: true,
                            })
                        }
                    >
                        <Badge count={cart.data.length || 0}></Badge>
                        <ICONS.LuBaggageClaim />
                    </div>
                    <div
                        className="flex items-center justify-center px-4 relative"
                        ref={menuRef}
                    >
                        <div
                            className="flex gap-2 items-center"
                            onClick={() => setIsShowMenuMember(true)}
                        >
                            <span className="font-bold text-lg">
                                {userInfo.data?.username}
                            </span>
                            <img
                                src={
                                    userInfo.data?.avatar ||
                                    "https://avatar.iran.liara.run/public/boy"
                                }
                                alt=""
                                className="w-[40px] h-[40px] rounded-[50%]  object-cover cursor-pointer border-2 border-gray-500"
                            />
                        </div>
                        {isShowMenuMember && (
                            <div className="absolute top-[50px] right-[20px] text-black bg-white  w-[200px] flex flex-col border-2 z-30">
                                <Link
                                    onClick={() => setIsShowMenuMember(false)}
                                    className="px-2 py-2 border font-semibold text-lg text-gray-600 hover:bg-gray-700 hover:text-white  "
                                    to={paths.MEMBER.PROFILE}
                                >
                                    Thông tin cá nhân
                                </Link>
                                <Link
                                    onClick={() => setIsShowMenuMember(false)}
                                    className="px-2 py-2 border font-semibold text-lg text-gray-600 hover:bg-gray-700 hover:text-white  "
                                    to={paths.MEMBER.HISTORY}
                                >
                                    Lịch sử mua hàng
                                </Link>
                                <button
                                    className="bg-red-600 w-full  text-white font-bold  rounded-none text-lg flex justify-center items-center gap-2"
                                    onClick={() => logoutRequest()}
                                >
                                    <ICONS.RiLogoutBoxLine />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Button
                    name={"Đăng nhập ngay"}
                    iconAfter={<ICONS.FaUserCircle />}
                    handleClick={() => {
                        navigate(paths.LOGIN);
                    }}
                />
            )}
        </div>
    );
}

export default withBaseComponent(Header);
