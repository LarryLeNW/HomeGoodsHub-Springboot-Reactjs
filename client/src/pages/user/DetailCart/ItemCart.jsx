import { notification } from "antd";
import SelectQuantity from "components/Form/SelectQuantity";
import withBaseComponent from "hocs";
import { useCallback, useState } from "react";
import { useAuthStore } from "store/auth.store";
import { useCartStore } from "store/cart.store";

import { formatMoney } from "utils/helper";

function ItemCart({ data, index }) {
    const { deleteCartRequest, fetchCarts, updateQuantityRequest } =
        useCartStore();
    const { userInfo } = useAuthStore();

    const [quantity, setQuantity] = useState(data?.quantity || 1);
    const [quantityChange, setQuantityChange] = useState(data?.quantity || 1);

    const handleQuantity = useCallback(
        (input) => {
            if (!Number(input) || Number(input) < 1) return;
            setQuantityChange(+input);
        },
        [quantityChange]
    );

    const handleClickQuantity = (flag) => {
        if (flag == "minus") {
            if (quantityChange <= 1) return;
            setQuantityChange((prev) => prev - 1);
        }
        if (flag == "plus") {
            setQuantityChange((prev) => prev + 1);
        }
    };

    const handleUpdateCart = () => {
        updateQuantityRequest({ ...data, quantity: quantityChange }, () => {
            fetchCarts(userInfo.data?.userId);
            setQuantity(quantityChange);
        });
    };

    return (
        <tr className="hover-row font-semibold">
            <td className="px-4 py-2 border border-slate-500 text-green-500  ">
                {index + 1}
            </td>
            <td className="px-4 py-2 border border-slate-500 flex items-center gap-2 justify-center">
                <span>
                    <img
                        src={data.product.thumb}
                        className="w-[70px] h-[70px] object-cover"
                        alt="img product"
                    />
                </span>
                <span>{data.title}</span>
            </td>
            <td className="px-4 py-2 border border-slate-500  ">
                <span className="flex justify-center items-center">
                    <SelectQuantity
                        quantity={quantityChange}
                        handleQuantity={handleQuantity}
                        handleClickQuantity={handleClickQuantity}
                    />
                </span>
            </td>

            <td className="px-4 py-2 border border-slate-500 ">
                <div className="flex gap-2 justify-between">
                    <span>
                        {formatMoney(data.product.unitPrice * data.quantity)}{" "}
                        vnđ
                    </span>
                    {data.quantity > 1 && (
                        <span className="text-sm text-green-700 italic">{`  ${formatMoney(
                            data.product.unitPrice
                        )} vnđ x1`}</span>
                    )}
                </div>
            </td>
            <td className="px-4 py-1 border border-slate-500  ">
                <div className="flex flex-col gap-1">
                    <button
                        disabled={quantity == quantityChange}
                        className={`p-1 rounded text-xs w-full bg-green-600 text-white ${
                            quantity == quantityChange &&
                            "opacity-30 cursor-not-allowed"
                        } `}
                        onClick={() => handleUpdateCart()}
                    >
                        Xác nhận
                    </button>
                    <button
                        className="p-1 rounded text-xs w-full bg-red-600 text-white"
                        onClick={() =>
                            deleteCartRequest(data.id, () => {
                                fetchCarts(userInfo.data.userId);
                            })
                        }
                    >
                        Xóa
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default withBaseComponent(ItemCart);
