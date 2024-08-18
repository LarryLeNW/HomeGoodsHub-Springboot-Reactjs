import axios from "config/axios";

export const addCart = (data) => {
    return axios({
        url: "/user/cart",
        method: "post",
        data,
    });
};

export const updateQuantity = (data) => {
    return axios({
        url: "/user/cart/updateQuantity",
        method: "put",
        data,
    });
};

export const getCarts = (uid) => {
    return axios({
        url: "/user/cart/" + uid,
        method: "get",
    });
};

export const removeCart = (cid) => {
    return axios({
        url: "/user/cart/" + cid,
        method: "delete",
    });
};
