import QueryString from "qs";
import { create } from "zustand";

const locationSearch = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
});

export const useCommonStore = create((set) => ({
    modal: {
        isShow: false,
        children: null,
        isAction: true,
    },
    filterParams: {
        category: locationSearch.category,
        keyword: locationSearch.keyword || "",
        sort: locationSearch.sort || undefined,
        priceFrom: locationSearch.priceFrom || undefined,
        priceTo: locationSearch.priceTo || undefined,
    },
    showModal: (payload) => {
        set(() => ({
            modal: {
                isShow: payload.isShowModal,
                children: payload.children || null,
                isAction: payload.isAction || false,
            },
        }));
    },
    setFilterParams: (payload) => {
        set(() => ({
            filterParams: payload,
        }));
    },
    clearFilterParams: () => {
        set(() => ({
            filterParams: {
                category: [],
                keyword: "",
                sort: undefined,
                priceFrom: undefined,
                priceTo: undefined,
            },
        }));
    },
}));
