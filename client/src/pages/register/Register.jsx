import { useState } from "react";
import "./Register.scss";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        registeredDate: new Date().toISOString().slice(0, 10),
    });

    const handleCheckEmail = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/login/checkEmail/${email}`);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("Email đã tồn tại");
                toast.error("Email đã tồn tại");
            } else {
                console.log("Lỗi", error);
            }
            return false;
        }
    }

    const validate = async () => {
        const checkError = {};
        if (!register.username) {
            checkError.username = "Vui lòng điền username !";
        }
        if (!register.email) {
            checkError.email = "Vui lòng điền email !";
        }
        else if (!/\S+@\S+\.\S+/.test(register.email)) {
            checkError.email = "Không đúng định dạng email";
        } else {
            const emailExists = await handleCheckEmail(register.email);
            if (emailExists) {
                checkError.email = "Email đã tồn tại !";
            }
        }
        if (!register.password) {
            checkError.password = "Vui lòng điền password";
        } else if (register.password.length < 6) {
            checkError.password = "Password phải hơn 6 ký tự";
        }
        if (!register.phone) {
            checkError.phone = "Vui lòng điền số điện thoại !";
        } else if (!/^\d{10}$/.test(register.phone)) {
            checkError.phone = "Điện thoại phải là số và gồm 10 số !";
        }
        setErrors(checkError);
        return Object.keys(checkError).length === 0;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({ ...register, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await validate()) {
            try {
                const response = await axios.post('http://localhost:8080/api/login/register', register);
                toast.success("Đăng ký thành công");
                console.log('Register success:', response.data);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } catch (error) {
                console.error('Register error:', error);
                toast.error("Lỗi khi đăng ký");
            }
        } else {
            toast.error("Có lỗi xảy ra khi đăng ký !");
        }
    };

    return (
        <>
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-4 register">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username...."
                                name="username"
                                value={register.username}
                                onChange={handleChange}
                                required
                            />
                            {errors.username && <span className="text-danger">{errors.username}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email...."
                                name="email"
                                value={register.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password...."
                                name="password"
                                value={register.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone...."
                                name="phone"
                                value={register.phone}
                                onChange={handleChange}
                                required
                            />
                            {errors.phone && <span className="text-danger">{errors.phone}</span>}
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btnDangky btn btn-success">
                                Đăng ký ngay
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Register;
