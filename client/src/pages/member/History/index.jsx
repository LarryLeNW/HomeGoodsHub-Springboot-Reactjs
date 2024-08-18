import withBaseComponent from "hocs";
import moment from "moment";
import { useEffect } from "react";
import { generatePath } from "react-router-dom";
import { useAuthStore } from "store/auth.store";
import { formatMoney } from "utils/helper";

function History({ navigate }) {
    const { userInfo } = useAuthStore();
    console.log("🚀 ~ History ~ userInfo:", userInfo.data);
    // const orders = useSelector((state) => state.order.data);

    // useEffect(() => {
    //   if (userInfo?.data?._id) dispatch(getOrdersRequest());
    // }, [userInfo?.data]);

    // const handleShowBill = (id) => {
    //   const url = generatePath(path.MEMBER.SHOW_BILL, { oid: id });
    //   window.open(url, "_blank");
    // };

    return (
        <div className="w-full overflow-y-auto px-4">
            <header className="text-3xl font-semibold py-4 border-b border-main text-blue-600 text-center">
                Lịch sử đơn hàng
            </header>
            <div className="flex flex-col justify-between overflow-y-auto  mx-auto mt-2">
                <table className="mb-1 text-left w-full border-separate border border-slate-400">
                    <thead className="font-bold bg-main text-[13px] text-center border border-blue-300  text-white ">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Mã Hóa Đơn</th>
                            <th className="px-4 py-2">Tổng tiền</th>
                            <th className="px-4 py-2">Địa chỉ giao</th>
                            <th className="px-4 py-2">Số điện thoại </th>
                            <th className="px-4 py-2">Trạng thái</th>
                            <th className="px-4 py-2">Ngày đặt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo.data?.orders?.map((order, index) => (
                            <tr
                                className="hover-row font-semibold cursor-pointer"
                                key={order?.id}
                                // onClick={() => {
                                //     handleShowBill(order?._id);
                                // }}
                            >
                                <td className="px-4 py-2 border border-slate-500 text-blue-500  ">
                                    {index}
                                </td>
                                <td className="px-4 py-2 border border-slate-500 ">
                                    <span>{order.orderId}</span>
                                </td>
                                <td className="px-4 py-2 border border-slate-500 ">
                                    <span>{formatMoney(order.amount)}đ</span>
                                </td>
                                <td className="px-4 py-2 border border-slate-500  overflow-hidden max-w-7 ">
                                    <span>{userInfo.data?.address}</span>
                                </td>
                                <td className="px-4 py-2 border border-slate-500 ">
                                    <span>{userInfo.data?.phone}</span>
                                </td>
                                <td className="px-4 py-2 border border-slate-500 ">
                                    <span>
                                        {order.status
                                            ? "Đang giao"
                                            : "Chờ xác nhận "}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border border-slate-500 ">
                                    <span>
                                        {moment(order.orderDate).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default withBaseComponent(History);
