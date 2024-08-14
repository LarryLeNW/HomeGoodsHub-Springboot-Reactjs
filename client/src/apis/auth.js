import axios from "config/axios";

export const getUserInfo = () =>
    axios({
        url: "/current",
        method: "get",
    });

export const login = (data) =>
    axios({
        url: "/login",
        method: "post",
        data,
    });

export const logout = () =>
    axios({
        url: "/logout",
        method: "get",
    });

/// processing ...
export const register = (data) =>
    axios({
        url: "/user/register",
        method: "post",
        data,
        withCredentials: true,
    });

export const forgotPassword = (data) =>
    axios({
        url: "/user/requestforgotpw",
        method: "post",
        data,
    });

export const resetPassword = (data) =>
    axios({
        url: "/user/resetpassword",
        method: "put",
        data,
    });
