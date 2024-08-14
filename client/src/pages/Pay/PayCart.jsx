// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-";
// import "./PayCart.scss";
// import { toast, ToastContainer } from "react-toastify";

const PayCart = () => {
    // const [orders, setOrders] = useState([]);
    // const [Shopping, setShopping] = useState([]);
    // useEffect(() => {
    //     const showPayCart = async () => {
    //         const customerId = customer.customerId;
    //         const response = await axios.get(
    //             `http://localhost:8080/api/showOrderByCustomer/${customerId}`
    //         );
    //         setOrders(response.data);
    //         console.log(response.data);
    //     };
    //     const ShowShoppingCart = async () => {
    //         const response = await axios.get(
    //             "http://localhost:8080/api/user/cart/customer",
    //             {
    //                 params: { customerId: customer.customerId },
    //             }
    //         );
    //         setShopping(response.data);
    //     };
    //     showPayCart();
    //     ShowShoppingCart();
    // }, [orders]);
    // const handlePayOrders = async () => {
    //     try {
    //         const response = await axios.get(
    //             "http://localhost:8080/api/user/cart/payOrders",
    //             {
    //                 withCredentials: true,
    //             }
    //         );
    //         toast.success("Thanh toán thành công !");
    //         console.log(response.data);
    //         // setOrders(response.data);
    //     } catch (error) {
    //         console.log("lỗi thanh toán: ", error);
    //         toast.error("Bạn cần thêm sản phẩm vào giỏ hàng để thanh toán !");
    //     }
    // };
    // const formatCurrency = (amount) => {
    //     return new Intl.NumberFormat("vi-VN", {
    //         style: "currency",
    //         currency: "VND",
    //     }).format(amount);
    // };
    // const totalPrice = Shopping.reduce(
    //     (total, item) => total + item.product.unitPrice * item.quantity,
    //     0
    // );
    return (
        <>
            {/* <div className="row ">
                <div className="col-md-7 PayThongTin">
                    <h3>Thông tin liên hệ giao hàng</h3>
                    <div className="form-group">
                        <label htmlFor="">Họ và tên: </label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="email.."
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Số điện thoại: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Số điện thoại.."
                        />
                    </div>
                    <h4>Địa chỉ giao hàng</h4>
                    <div class="form-group">
                        <label for="city">Chọn tỉnh thành *</label>
                        <select class="form-control" id="city">
                            <option>--- Chọn tỉnh thành ---</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="district">Chọn quận huyện *</label>
                        <select class="form-control" id="district">
                            <option>Bạn chưa chọn tỉnh thành</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ward">Tên phường/Xã *</label>
                        <input type="text" class="form-control" id="ward" />
                    </div>
                    <div class="form-group">
                        <label for="address">Số nhà, tên đường *</label>
                        <input type="text" class="form-control" id="address" />
                    </div>
                </div>
                <div className="col-md-5 PayGiaoHang">
                    <h4 className="mt-2 text-center">Giỏ hàng của bạn!</h4>
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá sản phẩm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Shopping.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product.productId}</td>
                                    <td>{item.product.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        {formatCurrency(
                                            item.product.unitPrice *
                                                item.quantity
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-grid">
                    <button
                        className="btn btn-info mt-5 btnPay"
                        onClick={handlePayOrders}
                    >
                        Thanh toán ngay {formatCurrency(totalPrice)}
                    </button>
                </div>
                <h3 className="mt-5 text-center">Lịch sử đơn hàng của bạn !</h3>
                <div className="col-md-12 mt-4">
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>ngày đặt hàng</th>
                                <th>người đặt</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.orderId}</td>
                                    <td>{item.orderDate}</td>
                                    <td>{customer.username}</td>
                                    <td>{item.amount}</td>
                                    <td>
                                        {item.status
                                            ? "Đã giao hàng"
                                            : "chưa giao hàng"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer /> */}
        </>
    );
};

export default PayCart;
