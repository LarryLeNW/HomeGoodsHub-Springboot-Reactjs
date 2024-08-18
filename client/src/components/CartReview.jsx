import withBaseComponent from "hocs";
// import { removeCartRequest } from "redux/slicers/auth.slicer";
import { formatMoney } from "utils/helper";
import ICONS from "utils/icons";
import Button from "./Form/Button";
import path from "constant/path";
import { useCartStore } from "store/cart.store";
import { useCommonStore } from "store/common.store";
import { useAuthStore } from "store/auth.store";

function CartReview({ navigate }) {
    const { cart, deleteCartRequest, fetchCarts } = useCartStore();
    const { userInfo } = useAuthStore();
    const { showModal } = useCommonStore();

    return (
        <div className="w-full h-full flex justify-end ">
            <div
                className=" w-[30%]  h-full overflow-y-auto bg-black text-white p-4 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className=" py-4 border-b border-gray-300 font-bold text-2xl flex justify-between items-center">
                    <span>Your cart</span>
                    <ICONS.IoIosCloseCircleOutline
                        color="orange"
                        className="cursor-pointer"
                        onClick={() => showModal({ isShowModal: false })}
                    />
                </header>
                <div className="flex-4 overflow-y-auto flex flex-col gap-3 py-2">
                    {cart.data?.map((el) => (
                        <div className="flex p-2 items-center" key={el?._id}>
                            <img
                                src={el?.product?.thumb}
                                alt=""
                                className="w-16 h-16 object-cover"
                            />
                            <div className="p-2 text-sm">
                                <div className="text-main">
                                    {el?.product?.name}
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-green-700">
                                        {formatMoney(
                                            el?.product?.unitPrice *
                                                el?.quantity
                                        )}{" "}
                                        đ
                                    </span>
                                    {el?.quantity > 1 && (
                                        <span>
                                            (
                                            {formatMoney(
                                                el?.product?.unitPrice
                                            )}{" "}
                                            x1)
                                        </span>
                                    )}
                                </div>

                                <div className="text-main">
                                    Quantity : {el?.quantity}
                                </div>
                            </div>
                            <ICONS.IoMdRemoveCircleOutline
                                className="ml-auto text-red-500 cursor-pointer "
                                size={24}
                                onClick={() => {
                                    deleteCartRequest(el?.id, () => {
                                        fetchCarts(userInfo.data?.userId);
                                    });
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-auto flex-1  border-t border-gray-200 ">
                    <div className="flex justify-between p-2">
                        <span>Subtotal : </span>
                        <span className="font-bold text-green-700">
                            {formatMoney(
                                cart?.data.reduce(
                                    (sum, el) =>
                                        (sum +=
                                            el?.product.unitPrice *
                                            el?.quantity),
                                    0
                                )
                            )}
                            vnđ
                        </span>
                    </div>
                    <Button
                        fw
                        name={"Detail cart"}
                        handleClick={() => {
                            navigate(path.DETAIL_CART);
                            showModal({ isShowModal: false });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default withBaseComponent(CartReview);
