import axios from "config/axios";

export const getProductCategories = (params) =>
    axios({
        url: "/category",
        method: "get",
        params,
    });

// not used
export const createCategory = (data) =>
    axios({
        url: "/category",
        method: "post",
        data,
    });

export const updateCategory = (cid, data) =>
    axios({
        url: "/category" + cid,
        method: "put",
        data,
    });

export const deleteCategory = (cid) =>
    axios({
        url: "/category" + cid,
        method: "delete",
    });
