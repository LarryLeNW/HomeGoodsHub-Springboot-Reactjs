import { Button, notification } from "antd";
import { deleteCategory } from "apis";
import withBaseComponent from "hocs";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import { useCategoryStore } from "store/category.store";
import { useCommonStore } from "store/common.store";
import { getOrders, updateOrder } from "apis/order";

function OrderManager() {
    const [data, setData] = useState([]);
    const { showModal } = useCommonStore();

    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
    const [params, setParams] = useState({
        keywords: "",
    });
    const [keyword, setKeyword] = useState("");

    const [isLoadingActions, setIsLoadingActions] = useState({
        loading: false,
        cid: null,
    });

    const keywordParamDebounce = useDebounce(keyword, 500);

    const handleMouseEnter = (id) => {
        setHoveredCategoryId(id);
    };

    const handleMouseLeave = () => {
        setHoveredCategoryId(null);
    };

    const fetchData = async () => {
        showModal({ isShowModal: true, isAction: true });
        try {
            const res = await getOrders();
            setData(res);
            console.log("🚀 ~ fetchData ~ res:", res);
        } catch (error) {
            console.log(error);
        }
        showModal({ isShowModal: false });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleFilter("keywords", keywordParamDebounce);
    }, [keywordParamDebounce]);

    const handleFilter = (key, value) => {
        const newFilterParams = {
            ...params,
            [key]: value,
        };
        setParams(newFilterParams);
    };

    // const handleDelete = async (cid) => {
    //     setIsLoadingActions({ loading: true, cid });
    //     let response;
    //     try {
    //         response = await deleteCategory(cid);
    //         fetchCategory();
    //         notification.success({
    //             message: "delete category successfully",
    //             duration: 1,
    //         });
    //     } catch (error) {
    //         notification.error({ message: "Delete failed..." });
    //     }
    //     setIsLoadingActions({ loading: false, cid: null });
    // };

    const updateStatus = async (order) => {
        showModal({ isShowModal: true });
        try {
            await updateOrder(order.orderId, {
                ...order,
                status: !order.status,
            });
            fetchData();
        } catch (error) {
            console.log("🚀 ~ updateStatus ~ error:", error);
        }
        showModal({ isShowModal: false });
    };

    return (
        <div className="w-full p-4 flex flex-col  overflow-x-auto min-h-full ">
            <div className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b border-blue-300">
                Manager categories
            </div>
            <div className="p-4 ">
                <div className="flex flex-col border justify-between ">
                    <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
                        <thead className="font-bold bg-gray-700 text-[13px] text-center border border-blue-300   ">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Order Id</th>
                                <th className="px-4 py-2">Total Price</th>
                                <th className="px-4 py-2">Type payment</th>
                                <th className="px-4 py-2">Order At</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((order, index) => (
                                <tr
                                    key={order.orderId}
                                    onMouseEnter={() =>
                                        handleMouseEnter(order.orderId)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                    className="hover-row relative"
                                >
                                    <td className="px-4 py-2 border border-slate-500  ">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-2 border border-slate-500 ">
                                        <span>{order.orderId}</span>
                                    </td>
                                    <td className="px-4 py-2 border border-slate-500 ">
                                        <span>{order.amount}</span>
                                    </td>
                                    <td className="px-4 py-2 border border-slate-500 ">
                                        <span>Thanh toán khi nhận hàng</span>
                                    </td>

                                    <td className="px-4 py-2 border border-slate-500 ">
                                        <span>
                                            {moment(order?.orderDate).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 border border-slate-500 ">
                                        <span>
                                            {order.status
                                                ? "Đã xác nhận"
                                                : "Đang chờ xác nhận"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 flex justify-around flex-wrap gap-5">
                                        <Button
                                            className={`px-2 text-white  ${
                                                order.status
                                                    ? "bg-red-600"
                                                    : "bg-green-500"
                                            } w-full  cursor-pointer border  `}
                                            onClick={() => updateStatus(order)}
                                        >
                                            {order.status ? "Hủy" : "Xác nhận"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default withBaseComponent(OrderManager);
