import { notification } from "antd";
import { getUserInfo, login, logout, register } from "apis";
import paths from "constant/path";
import { create } from "zustand";

const showNotification = (type, message) => {
    notification[type]({
        message,
        duration: 1,
    });
};

export const useAuthStore = create((set) => ({
    userInfo: {
        data: null,
        isLoading: false,
        error: null,
    },
    dataLogin: {
        isLoading: false,
        error: null,
    },
    dataRegister: {
        isLoading: false,
        error: null,
    },
    fetchUserInfo: async () => {
        set(() => ({
            userInfo: {
                isLoading: true,
                error: null,
            },
        }));
        try {
            const response = await getUserInfo();
            set(() => ({
                userInfo: {
                    data: response,
                    isLoading: false,
                    error: null,
                },
            }));
            showNotification("success", `Chào mừng ${response.username}`);
        } catch (error) {
            set(() => ({
                userInfo: {
                    isLoading: false,
                    error: error.message,
                },
            }));
        }
    },
    registerRequest: async (dataPayload, navigate) => {
        set(() => ({
            dataRegister: {
                isLoading: true,
                error: null,
            },
        }));
        try {
            const response = await register(dataPayload);
            set(() => ({
                userInfo: {
                    data: response,
                },
                dataRegister: {
                    isLoading: false,
                    error: null,
                },
            }));
            showNotification("success", "Đăng kí thành công.");
            navigate(paths.HOME);
        } catch (error) {
            console.log("🚀 ~ loginRequest: ~ error:", error);
            set(() => ({
                dataRegister: {
                    isLoading: false,
                    error: error?.response?.data,
                },
            }));
            showNotification("error", error?.response?.data);
        }
    },
    loginRequest: async (dataPayload, navigate) => {
        set(() => ({
            dataLogin: {
                isLoading: true,
                error: null,
            },
        }));
        try {
            const response = await login(dataPayload);
            set(() => ({
                userInfo: {
                    data: response,
                    isLoading: false,
                    error: null,
                },
                dataLogin: {
                    isLoading: false,
                    error: null,
                },
            }));
            showNotification("success", "Đăng nhập thành công.");
            navigate(paths.HOME);
        } catch (error) {
            console.log("🚀 ~ loginRequest: ~ error:", error);
            set(() => ({
                dataLogin: {
                    isLoading: false,
                    error: error.message,
                },
            }));
            showNotification("error", "Tài khoản hoặc mật khẩu sai");
        }
    },
    logoutRequest: async () => {
        try {
            await logout();
            set(() => ({
                userInfo: {
                    data: null,
                },
            }));
            showNotification("success", "Đăng xuất thành công.");
        } catch (error) {
            console.log("🚀 ~ logoutRequest: ~ error:", error);
            showNotification("error", "Something went wrong");
        }
    },
}));
