const routes = {
    HOME: "/",
    CONTACT: "/contact",
    LOGIN: "/login",
    REGISTER: "/register",
    DETAIL_PRODUCT: "/detail-product/:id",
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
        MANAGE_USER: "/admin/user",
        PRODUCT: "/admin/product",
        ORDER: "/admin/order",
        SECURITY_USER: "/admin/security-user",
    },
    MEMBER: {
        CHECKOUT: "/member/checkout",
        PROFILE: "/member/checkout",
        CART: "/member/checkout",
        ORDER_HISTORY: "/member/order-history",
    },
};

export default routes;
