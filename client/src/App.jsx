import Modal from "components/Modal";
import paths from "constant/path";
import AdminLayout from "layout/AdminLayout";
import MemberLayout from "layout/MemberLayout";
import UserLayout from "layout/UserLayout";
import {
    OrderManagerPage,
    ProductCategoryPage,
    ProductManagerPage,
    UpdateProductPage,
    UserManagerPage,
} from "pages/admin";
import { CheckoutPage, HistoryPage, ProfilePage } from "pages/member";
import { AuthPage, DetailCartPage, HomePage } from "pages/user";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthStore } from "store/auth.store";
import "./App.css";
import DetailProduct from "pages/user/DetailProduct";

function App() {
    const navigate = useNavigate();
    const { fetchUserInfo } = useAuthStore();

    useEffect(() => {
        fetchUserInfo(navigate);
    }, []);

    return (
        <div className="min-h-screen font-main">
            <Routes>
                <Route element={<UserLayout />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path={paths.DETAIL_CART}
                        element={<DetailCartPage />}
                    />
                    <Route
                        path={paths.DETAIL_PRODUCT}
                        element={<DetailProduct />}
                    />
                    <Route
                        path={paths.OUR_SERVICES}
                        element={<div> ServicePage</div>}
                    />
                    <Route path={paths.FAQ} element={<div> FAQPage</div>} />
                    <Route
                        path={paths.PRODUCTS}
                        element={<div> ListProductPage</div>}
                    />
                    <Route
                        path={paths.INTRODUCE}
                        element={<div>IntroducePage</div>}
                    />
                </Route>
                <Route element={<MemberLayout />}>
                    <Route
                        path={paths.MEMBER.PROFILE}
                        element={<ProfilePage />}
                    />
                    <Route
                        path={paths.MEMBER.HISTORY}
                        element={<HistoryPage />}
                    />
                    <Route
                        path={paths.MEMBER.WISH_LIST}
                        element={<div>WhiteListPage</div>}
                    />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route
                        path={paths.ADMIN.HOME}
                        element={<UserManagerPage />}
                    />
                    <Route
                        path={paths.ADMIN.ORDER_MANAGEMENT}
                        element={<OrderManagerPage />}
                    />

                    <Route
                        path={paths.ADMIN.PRODUCT_CATEGORY_MANAGEMENT}
                        element={<ProductCategoryPage />}
                    />
                    <Route
                        path={paths.ADMIN.PRODUCT_MANAGEMENT}
                        element={<ProductManagerPage />}
                    />
                    <Route
                        path={paths.ADMIN.UPDATE_PRODUCT}
                        element={<UpdateProductPage />}
                    />
                    <Route
                        path={paths.ADMIN.USER_MANAGEMENT}
                        element={<UserManagerPage />}
                    />
                </Route>
                <Route path={paths.LOGIN} element={<AuthPage />} />
                <Route
                    path={paths.MEMBER.CHECKOUT}
                    element={<CheckoutPage />}
                />
                <Route
                    path={paths.FORGOT_PASSWORD}
                    element={<div>ForgotPasswordPage</div>}
                />
                <Route
                    path={paths.CONFIRM_REGISTER}
                    element={<div>ConfirmRegisterPage</div>}
                />
                <Route
                    path={paths.MEMBER.SHOW_BILL}
                    element={<div>ShowBillPage</div>}
                />
            </Routes>
            <Modal />
        </div>
    );
}

export default App;
