import axios from "config/axios";

export const addOrder = () => {
    return axios({
        url: "/user/cart/payOrders",
        method: "get",
        withCredentials: true,
    });
};

export const getOrders = () => {
    return axios({
        url: "/orders",
        method: "get",
    });
};

export const updateOrder = (oid, data) => {
    return axios({
        url: "/orders/" + oid,
        method: "put",
        data,
    });
};
