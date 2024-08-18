import { notification } from "antd";
import { addOrder } from "apis/order";
import paymentSvg from "assets/payment.svg";
import Button from "components/Form/Button";
import paths from "constant/path";
import withBaseComponent from "hocs";
import { useEffect, useState } from "react";
import { generatePath, Navigate } from "react-router-dom";
// import { orderRequest } from "redux/slicers/order.slicer";
import { useAuthStore } from "store/auth.store";
import { useCartStore } from "store/cart.store";
import { useCommonStore } from "store/common.store";
import Swal from "sweetalert2";
import { formatMoney } from "utils/helper";

function Checkout({ navigate }) {
    const { userInfo } = useAuthStore();
    const [address, setAddress] = useState("");
    const [numberPhone, setNumberPhone] = useState("");
    const [typePayment, setTypePayment] = useState("");
    const [note, setNote] = useState("");
    let [total, setTotal] = useState(0);
    let { cart } = useCartStore();
    const { showModal } = useCommonStore();

    useEffect(() => {
        if (userInfo.data) {
            setAddress(userInfo.data?.address);
            setNumberPhone(userInfo.data?.phone);
            setTotal(
                cart?.data?.reduce(
                    (sum, c) => (sum += c?.quantity * c?.product.unitPrice),
                    0
                )
            );
        }
    }, [userInfo.data]);

    // Handler for radio button change
    const handlePaymentTypeChange = (e) => {
        if (e.target.value === "Online") {
            notification.warning({
                message: "Hệ thống bảo trì, xin cảm ơn",
                duration: 1,
            });
            return;
        }
        setTypePayment(e.target.value);
    };

    const handleOrder = async () => {
        if (!userInfo.data) {
            notification.warning({
                message: "Vui lòng đăng nhập lại...",
                duration: 1,
            });
            return;
        }

        showModal({ isShowModal: true });

        try {
            const res = await addOrder();
            userInfo.data = res;
            notification.success({
                message: "Thêm đơn hàng thành công ",
                duration: 1,
            });
            navigate(paths.MEMBER.HISTORY);
        } catch (error) {
            notification.warning({
                message: "Something went wrong... ",
                duration: 1,
            });
        }
        showModal({ isShowModal: false });
    };

    if (userInfo.isLoading) {
        return;
    } else if (!userInfo?.data?.userId) {
        <Navigate to={paths.HOME} replace={true} />;
    }

    return (
        <div className="p-4 flex justify-center">
            <div className="w-[40%] h-full">
                <img src={paymentSvg} alt="payment" className="object-cover" />
            </div>
            <div className="border rounded h-full p-4 w-[50%]">
                <h2 className="text-2xl font-bold">
                    Kiểm tra đơn hàng của bạn
                </h2>
                <table className="table-auto w-full">
                    <thead>
                        <tr className="border border-gray-200">
                            <th className="p-2 text-left">Sản phẩm</th>
                            <th className="text-center p-2">Số lượng</th>
                            <th className="text-right p-2">Đơn giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.data?.map((item, index) => (
                            <tr key={index} className="border">
                                <td className="p-2 text-left">
                                    {item.product.name}
                                </td>
                                <td className="text-center p-2">
                                    {item.quantity}
                                </td>
                                <td className="text-right p-2">
                                    {formatMoney(item.product.unitPrice)}vnđ
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex gap-2 justify-end font-bold">
                    <span>Tổng tiền:</span>
                    <span className="text-green-800">
                        {formatMoney(total)} vnđ
                    </span>
                    <span className="text-blue-800">
                        ~ {total / 25000} USD{" "}
                    </span>
                </div>

                <div className="p-2 flex flex-col gap-2  ">
                    <span className="font-bold">Địa chỉ</span>
                    <input
                        type="text"
                        placeholder="Vui lòng nhập địa chỉ muốn giao đến..."
                        className="border border-main p-1 outline-main py-4 px-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="p-2 flex flex-col gap-2">
                    <span className="font-bold">Số điện thoại</span>
                    <input
                        type="text"
                        className="border border-main p-1"
                        value={numberPhone}
                        onChange={(e) => setNumberPhone(e.target.value)}
                    />
                </div>
                <div className="p-2 flex justify-between items-center">
                    <div className="flex justify-center items-center gap-2">
                        <label
                            htmlFor="Direct"
                            className="font-bold cursor-pointer"
                        >
                            Thanh toán khi nhận hàng
                        </label>
                        <input
                            id="Direct"
                            type="radio"
                            name="typePayment"
                            value="Direct"
                            checked={typePayment === "Direct"}
                            onChange={handlePaymentTypeChange}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <label
                            htmlFor="online"
                            className="font-bold cursor-pointer"
                        >
                            Thanh toán qua banking
                        </label>
                        <input
                            id="online"
                            type="radio"
                            name="typePayment"
                            value="Online"
                            checked={typePayment === "Online"}
                            onChange={handlePaymentTypeChange}
                        />
                    </div>
                </div>
                <div className="p-2 flex flex-col gap-2">
                    <span className="font-bold">Ghi chú đến shop</span>
                    <textarea
                        type="text"
                        className="border border-main p-1"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
                <Button fw name={"Đặt hàng ngay"} handleClick={handleOrder} />
            </div>
        </div>
    );
}

export default withBaseComponent(Checkout);
