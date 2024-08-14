import { notification } from "antd";
import { getUserInfo, login, logout } from "apis";
import paths from "constant/path";
import Swal from "sweetalert2";
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
            showNotification("success", `Chào mừng ${response.email}`);
        } catch (error) {
            set(() => ({
                userInfo: {
                    isLoading: false,
                    error: error.message,
                },
            }));
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
