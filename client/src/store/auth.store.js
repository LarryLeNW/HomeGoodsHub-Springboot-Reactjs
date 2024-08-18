import { notification } from "antd";
import { getUserInfo, login, logout, register } from "apis";
import paths from "constant/path";
import { create } from "zustand";
import { useCommonStore } from "./common.store";

const showNotification = (type, message) => {
    notification[type]({
        message,
        duration: 1,
    });
};

export const useAuthStore = create((set, get) => ({
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
    fetchUserInfo: async (navigate) => {
        const { showModal } = useCommonStore.getState();
        showModal({ isShowModal: true });

        set((state) => ({
            userInfo: {
                ...state.userInfo,
                isLoading: true,
                error: null,
            },
        }));

        try {
            const response = await getUserInfo();
            set((state) => ({
                userInfo: {
                    data: response,
                    isLoading: false,
                    error: null,
                },
            }));
            showNotification("success", `Chào mừng ${response.username}`);
            navigate(
                response.role.name === "ADMIN" ? paths.ADMIN.HOME : paths.HOME
            );
        } catch (error) {
            set((state) => ({
                userInfo: {
                    isLoading: false,
                    error: error.message,
                },
            }));
        } finally {
            showModal({ isShowModal: false });
        }
    },
    registerRequest: async (dataPayload, navigate) => {
        set((state) => ({
            dataRegister: {
                isLoading: true,
                error: null,
            },
        }));

        try {
            const response = await register(dataPayload);
            set((state) => ({
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
            console.log("🚀 ~ registerRequest: ~ error:", error);
            set((state) => ({
                dataRegister: {
                    isLoading: false,
                    error: error?.response?.data || error.message,
                },
            }));
            showNotification("error", error?.response?.data || "Đã xảy ra lỗi");
        }
    },
    loginRequest: async (dataPayload, navigate) => {
        set((state) => ({
            dataLogin: {
                isLoading: true,
                error: null,
            },
        }));

        try {
            const response = await login(dataPayload);
            set((state) => ({
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
            navigate(
                response.role.name === "ADMIN" ? paths.ADMIN.HOME : paths.HOME
            );
        } catch (error) {
            console.log("🚀 ~ loginRequest: ~ error:", error);
            set((state) => ({
                dataLogin: {
                    isLoading: false,
                    error: error?.message || "Tài khoản hoặc mật khẩu sai",
                },
            }));
            showNotification("error", "Tài khoản hoặc mật khẩu sai");
        }
    },
    logoutRequest: async () => {
        try {
            await logout();
            set((state) => ({
                userInfo: {
                    data: null,
                },
            }));
            showNotification("success", "Đăng xuất thành công.");
        } catch (error) {
            console.log("🚀 ~ logoutRequest: ~ error:", error);
            showNotification("error", "Đã xảy ra lỗi khi đăng xuất.");
        }
    },
}));
