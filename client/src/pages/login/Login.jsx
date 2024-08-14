import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const checkValidate = () => {
        // const check = {};
        // if (!email) {
        //     check.email = "Vui lòng điền thông tin email !";
        // }
        // if (!password) {
        //     check.password = "Vui lòng điền thông tin password !";
        // }
        // setError(check);
        // return Object.keys(check).length === 0;
    };

    const handleLogin = () => {
        // if (checkValidate()) {
        //     dispatch(
        //         loginStart({
        //             data: {
        //                 email: email,
        //                 password: password,
        //             },
        //             callback: () => {
        //                 console.log("log sussess");
        //                 toast.success("Đăng nhập thành công !");
        //                 setTimeout(() => {
        //                     navigate("/");
        //                 }, 1000);
        //             },
        //             errorCallback: () => {
        //                 toast.error("Tài khoản mật khẩu sai !");
        //             },
        //         })
        //     );
        // } else {
        //     toast.error("Cần điền đủ các trường thông tin !");
        // }
    };
    // const handleCheckLogin = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.get("http://localhost:8080/api/login/authenticate", {
    //             params: { email, password }
    //         });

    //         setCustomer(response.data);
    //         localStorage.setItem("customer", JSON.stringify(response.data));
    //         console.log("Customer data:", response.data);
    //         toast.success("Đăng nhập thành công!");

    //         setTimeout(() => {
    //             navigate("/");
    //         }, 2000);
    //     } catch (error) {
    //         console.error("Lỗi đăng nhập:", error);
    //         toast.error("Tài khoản hoặc mật khẩu không chính xác !");
    //     }
    // }
    return (
        <>
            <div className="form">
                {/* <div className="login col-md-6">
                    <h3 className="text-center textLogin">Login</h3>
                    <p>
                        Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm
                        thành viên và nhận được những ưu đãi tốt hơn!
                    </p>
                    <div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {error.email && (
                                <span className="text-danger">
                                    {error.email}
                                </span>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="pwd"
                                placeholder="Enter password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error.password && (
                                <span className="text-danger">
                                    {error.password}
                                </span>
                            )}
                        </div>
                        <div className="form-check mb-3">
                            <label className="form-check-label">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="remember"
                                />{" "}
                                Remember me
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleLogin()}
                            className="btnSubmit btn-primary"
                        >
                            Submit
                        </button>
                        <br />
                        <div class="d-flex justify-content-between">
                            <Link to="/register">
                                {" "}
                                <a href="" className="dangky">
                                    Đăng ký?
                                </a>
                            </Link>
                            <Link to="/forgotPassword">
                                {" "}
                                <a href="" className="forgotpassword text-end">
                                    Quên mật khẩu{" "}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div> */}
            </div>

            <ToastContainer />
        </>
    );
};

export default Login;
