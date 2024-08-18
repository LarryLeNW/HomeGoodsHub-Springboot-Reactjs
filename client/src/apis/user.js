import axios from "config/axios";

export const getUsers = (params) =>
    axios({
        url: "/admin/users",
        method: "get",
        params,
    });

export const updateUser = (uid, data) =>
    axios({
        url: "/admin/users/" + uid,
        method: "put",
        data,
    });

export const changeAvatar = (uid, data) =>
    axios({
        url: "/admin/users/changeAvatar/" + uid,
        method: "put",
        data,
    });

export const updateInfoUserCurrent = (data) => {
    return axios({
        url: "/user/current",
        method: "put",
        data,
    });
};

export const deleteUser = (uid) =>
    axios({
        url: "/admin/users/" + uid,
        method: "delete",
    });

export const createUser = async (data) => {
    axios({
        url: "/admin/users",
        method: "post",
        data,
    });
};
