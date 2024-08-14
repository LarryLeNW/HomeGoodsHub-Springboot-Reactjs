import logo from "./logo.svg";
import "./App.css";
import paths from "constant/path";
import Modal from "components/Modal";
import UserLayout from "layout/UserLayout";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "pages/user";
import { useEffect } from "react";
import { useAuthStore } from "store/auth.store";

function App() {
    // const { modal } = {};
    const { fetchUserInfo } = useAuthStore();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div className="min-h-screen font-main">
            <Routes>
                <Route element={<UserLayout />}>
                    <Route index element={<div> HomePage</div>} />
                    <Route
                        path={paths.DETAIL_CART}
                        element={<div>DetailCartPage</div>}
                    />
                    <Route
                        path={paths.BLOGS}
                        element={<div> ListBlogsPage </div>}
                    />
                    <Route
                        path={paths.DETAIL_PRODUCT}
                        element={<div>DetailProduct</div>}
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
                        path={paths.DETAIL_BLOG}
                        element={<div>DetailBlogPage</div>}
                    />
                    <Route
                        path={paths.INTRODUCE}
                        element={<div>IntroducePage</div>}
                    />
                </Route>
                <Route element={<div> MemberLayout</div>}>
                    <Route
                        path={paths.MEMBER.PROFILE}
                        element={<div>ProfilePage</div>}
                    />
                    <Route
                        path={paths.MEMBER.MY_CART}
                        element={<div>ListCartPage</div>}
                    />
                    <Route
                        path={paths.MEMBER.HISTORY}
                        element={<div>HistoryPage</div>}
                    />
                    <Route
                        path={paths.MEMBER.WISH_LIST}
                        element={<div>WhiteListPage</div>}
                    />
                </Route>
                <Route element={<div>AdminLayout</div>}>
                    <Route
                        path={paths.ADMIN.HOME}
                        element={<div>UserManagerPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.ORDER_MANAGEMENT}
                        element={<div>OrderManagerPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.UPDATE_ORDER}
                        element={<div>UpdateOrderPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.PRODUCT_CATEGORY_MANAGEMENT}
                        element={<div>ProductCategoryPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.PRODUCT_MANAGEMENT}
                        element={<div>ProductManagerPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.UPDATE_PRODUCT}
                        element={<div>UpdateProductPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.USER_MANAGEMENT}
                        element={<div>UserManagerPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.VARIANT_MANAGEMENT}
                        element={<div>VariantProductPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.BLOG_MANAGEMENT}
                        element={<div>BlogManagerPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.BLOG_CATEGORY_MANAGEMENT}
                        element={<div>BlogCategoryManagerPage</div>}
                    />
                    <Route
                        path={paths.ADMIN.UPDATE_BLOG}
                        element={<div>UpdateBlogPage</div>}
                    />
                </Route>
                <Route path={paths.LOGIN} element={<LoginPage />} />
                <Route
                    path={paths.MEMBER.CHECKOUT}
                    element={<div>CheckoutPage</div>}
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
            {/* {(modal.isShow || userInfo.loading) && (
                <Modal isAction={modal.isAction}>
                    {modal.children || <Loading />}
                </Modal>
            )} */}
        </div>
    );
}

export default App;
