import { useEffect, useState } from "react";
import "./ShoppingCart.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const ShoppingCart = () => {
    // const navigate = useNavigate();
    // const [ShoppingCart, setShoppingCart] = useState([]);
    // // console.log(cus);

    // useEffect(() => {
    //     if (!customer) {
    //         toast.warning("Bạn cần phải đăng nhập");
    //         navigate("/login");
    //     }
    // }, [customer, navigate]);

    // useEffect(() => {
    //     const showCart = async () => {
    //         try {
    //             console.log("id cuar cusstomer o cart: " + customer.customerId);
    //             const response = await axios.get(
    //                 "http://localhost:8080/api/user/cart/customer",
    //                 {
    //                     params: { customerId: customer.customerId },
    //                 }
    //             );
    //             //  console.log("Cart data:", response.data)
    //             setShoppingCart(response.data);
    //         } catch (error) {
    //             console.log("lỗi show cart: " + error);
    //         }
    //     };
    //     showCart();
    // }, []);
    // const handleDelete = async (id) => {
    //     console.log(id);
    //     try {
    //         const response = await axios.delete(
    //             `http://localhost:8080/api/user/cart/delete/${id}`
    //         );
    //         setShoppingCart(ShoppingCart.filter((cart) => cart.id !== id));
    //     } catch (error) {
    //         console.log("lỗi delete :" + error);
    //     }
    // };
    // const handleQuantityChange = (id, newQuantity) => {
    //     setShoppingCart(
    //         ShoppingCart.map((item) =>
    //             item.id === id ? { ...item, quantity: newQuantity } : item
    //         )
    //     );
    // };
    // const handleUpdateQuantity = async (id) => {
    //     const itemToUpdate = ShoppingCart.find((item) => item.id === id);
    //     if (itemToUpdate) {
    //         try {
    //             await axios.put(
    //                 `http://localhost:8080/api/user/cart/updateQuantity`,
    //                 {
    //                     id: itemToUpdate.id,
    //                     quantity: itemToUpdate.quantity,
    //                 }
    //             );
    //             toast.success("Update thành công");
    //         } catch (error) {
    //             console.log("lỗi update quantity " + error);
    //         }
    //     }
    // };
    // const formatCurrency = (amount) => {
    //     return new Intl.NumberFormat("vi-VN", {
    //         style: "currency",
    //         currency: "VND",
    //     }).format(amount);
    // };
    // const totalPrice = ShoppingCart.reduce(
    //     (total, item) => total + item.product.unitPrice * item.quantity,
    //     0
    // );

    // if (!customer) return null;
    return (
        <>
            {/* <div class="container mt-3">
                <h2>Giỏ Hàng</h2>
                <table class="table table-hover mt-5">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá sản phẩm</th>
                            <th>Tùy chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ShoppingCart.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product.productId}</td>
                                <td>{item.product.name}</td>
                                <td>
                                    {
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            style={{ width: "70px" }}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    item.id,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    }
                                </td>
                                <td>
                                    {formatCurrency(
                                        item.product.unitPrice * item.quantity
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            handleUpdateQuantity(item.id)
                                        }
                                    >
                                        Update
                                    </button>{" "}
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>{" "}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="form-group mt-5">
                    <button className="btn btn-primary">
                        Xóa tất cả sản phẩm{" "}
                    </button>
                </div>
                <div className="total text-end">
                    <b>Tổng tiền: {formatCurrency(totalPrice)}</b>
                </div>{" "}
                <br />
                <div className="text-end ">
                    <Link to="/paycart">
                        <button className="pay btn btn-info ">
                            Thanh toán ngay
                        </button>
                    </Link>
                </div>
            </div>{" "}
            <br />
            <br /> */}
            <ToastContainer></ToastContainer>
        </>
    );
};
export default ShoppingCart;
