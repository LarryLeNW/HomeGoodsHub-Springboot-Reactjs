import axios from "config/axios";

export const getUserInfo = () =>
    axios({
        url: "/current",
        method: "get",
        withCredentials: true,
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

export const register = (data) =>
    axios({
        url: "/register",
        method: "post",
        data,
    });

/// processing ...

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
