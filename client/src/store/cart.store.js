import { notification } from "antd";
import { addCart, getCarts, removeCart, updateQuantity } from "apis/cart";
import { create } from "zustand";
import { useCommonStore } from "./common.store";

const showNotification = (type, message) => {
    notification[type]({
        message,
        duration: 1,
    });
};

const { showModal } = useCommonStore.getState();

export const useCartStore = create((set, get) => ({
    cart: {
        data: [],
        isLoading: false,
        error: null,
    },
    addCartRequest: async (productId, userId, quantity, callback) => {
        showModal({ isShowModal: true });
        try {
            const response = await addCart({
                product: { productId },
                quantity,
                user: { userId },
            });
            callback();
            showNotification("success", response);
        } catch (error) {
            showNotification("error", "Failed to add to cart");
        } finally {
            showModal({ isShowModal: false });
        }
    },
    updateQuantityRequest: async (data, callback) => {
        showModal({ isShowModal: true });
        try {
            const response = await updateQuantity(data, callback);
            callback();
            showNotification("success", response);
        } catch (error) {
            showNotification("error", "Failed to add to cart");
        } finally {
            showModal({ isShowModal: false });
        }
    },
    fetchCarts: async (uid) => {
        set((state) => ({
            cart: {
                ...state.cart,
                isLoading: true,
                error: null,
            },
        }));
        try {
            const response = await getCarts(uid);
            set((state) => ({
                cart: {
                    data: response,
                    isLoading: false,
                    error: null,
                },
            }));
        } catch (error) {
            set((state) => ({
                cart: {
                    ...state.cart,
                    isLoading: false,
                    error,
                },
            }));
        }
    },
    deleteCartRequest: async (cid, callback) => {
        set((state) => ({
            cart: {
                ...state.cart,
                isLoading: true,
                error: null,
            },
        }));
        try {
            await removeCart(cid);
            set((state) => ({
                cart: {
                    ...state.cart,
                    isLoading: false,
                    error: null,
                },
            }));
            await callback();
            showNotification("success", "Item removed from cart");
        } catch (error) {
            set((state) => ({
                cart: {
                    ...state.cart,
                    isLoading: false,
                    error,
                },
            }));
        }
    },
}));
