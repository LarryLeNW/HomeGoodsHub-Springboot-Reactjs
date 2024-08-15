import { notification } from "antd";
import { getUserInfo, login, logout, register } from "apis";
import paths from "constant/path";
import { create } from "zustand";
import { useCommonStore } from "./common.store";
import { addCart } from "apis/cart";

const showNotification = (type, message) => {
    notification[type]({
        message,
        duration: 1,
    });
};

const { showModal } = useCommonStore.getState();

export const useCartStore = create((set) => ({
    cart: {
        data: null,
        isLoading: false,
        error: null,
    },
    addCartRequest: async (productId, userId, quantity) => {
        showModal({ isShowModal: true });
        try {
            const response = await addCart({
                product: { productId },
                quantity,
                user: { userId },
            });
            showNotification("success", response);
        } catch (error) {
            showNotification("error", "Failed to add to cart");
        }
        showModal({ isShowModal: false });
    },
}));
