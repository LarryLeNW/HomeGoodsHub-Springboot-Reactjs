import axios from "config/axios";

export const addCart = (data) => {
    return axios({
        url: "/user/cart",
        method: "post",
        data,
    });
};

export const removeCart = (pid) => {
    return axios({
        url: "/cart/" + pid,
        method: "delete",
    });
};
