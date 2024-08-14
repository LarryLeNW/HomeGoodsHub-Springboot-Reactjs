import React, { useEffect } from "react";
import {
    Route,
    Routes,
    useLocation,
    Navigate,
    useNavigate,
    Outlet,
} from "react-router-dom";
import "./App.css";
import HomePages from "./pages/home/HomePages";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Product from "./pages/product/Product";
import ManageProduct from "./pages/admin/manageProduct/ManageProduct";
import HeaderAdmin from "./pages/admin/headerAdmin/HeaderAdmin";
import ManageCategory from "./pages/admin/manageCategory/ManageCategory";
import ShoppingCart from "./pages/cart/ShoppingCart";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import ManagerUser from "./pages/admin/manageUser/ManagerUser";
import SecurityUser from "./pages/admin/SecurityUser/SecurityUser";
import PayCart from "./pages/Pay/PayCart";
import { getCurrent } from "./components/apis/auth";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./PrivateRoute";
import Contact from "./pages/contact/Contact";
import Register from "./pages/register/Register";
import ProductCarousel from "pages/product/ProductCarousel";
import UserLayout from "Layout/UserLayout";
import AdminLayout from "Layout/AdminLayout";
import routes from "constant/path";

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    // const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <Routes>
            <Route path={routes.LOGIN} element={<div>LOGIN page</div>} />
            <Route path={routes.REGISTER} element={<div>REGISTER page</div>} />
            <Route element={<UserLayout />}>
                <Route index element={<div>Home page</div>} />
                <Route
                    path={routes.CONTACT}
                    element={<div>CONTACT page</div>}
                />

                <Route
                    path={routes.DETAIL_PRODUCT}
                    element={<div>PRODUCT page</div>}
                />
                <Route
                    path={routes.MEMBER.PROFILE}
                    element={<div>Profile page</div>}
                />
                <Route
                    path={routes.MEMBER.CHECKOUT}
                    element={<div>CHECKOUT page</div>}
                />
                <Route
                    path={routes.MEMBER.CART}
                    element={<div>CART page</div>}
                />
            </Route>
            <Route element={<AdminLayout />}>
                <Route
                    path={routes.ADMIN.DASHBOARD}
                    element={<div>DASHBOARD page</div>}
                />
                <Route
                    path={routes.ADMIN.MANAGE_USER}
                    element={<div>MANAGE_USER page</div>}
                />
                <Route
                    path={routes.ADMIN.ORDER}
                    element={<div>ORDER MANAGER page</div>}
                />
                <Route
                    path={routes.ADMIN.PRODUCT}
                    element={<div>PRODUCT MANAGER page</div>}
                />
                <Route
                    path={routes.ADMIN.SECURITY_USER}
                    element={<div>SECURITY_USER MANAGER page</div>}
                />
            </Route>
        </Routes>
    );
}

export default App;
