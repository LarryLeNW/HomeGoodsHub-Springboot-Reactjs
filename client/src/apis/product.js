import axios from "config/axios";

export const getProducts = (params) =>
    axios({
        url: "/product",
        method: "get",
        params,
    });

export const getProduct = (id) => {
    return axios({
        url: "/product/" + id,
        method: "get",
    });
};

export const createProduct = (data) => {
    return axios({
        url: "/admin/product",
        method: "post",
        data,
    });
};

export const deleteProduct = (pid) => {
    return axios({
        url: "/admin/product/" + pid,
        method: "delete",
    });
};

export const updateProduct = (pid, data) => {
    return axios({
        url: "/admin/product/" + pid,
        method: "put",
        data,
    });
};

export const ratings = (data) => {
    return axios({
        url: "/review/",
        method: "put",
        data,
    });
};

export const getReview = (params) => {
    return axios({
        url: "/review",
        method: "get",
        params,
    });
};
