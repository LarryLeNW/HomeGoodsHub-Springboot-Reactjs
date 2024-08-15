// import { notification } from "antd";
// import { getProductCategories } from "apis";
// import { create } from "zustand";

// export const useProductStore = create((set) => ({
//     data: [],
//     isLoading: false,
//     error: null,
//     fetchProduct: async (params) => {
//         set(() => ({
//             isLoading: true,
//             error: null,
//         }));
//         try {
//             const response = await getProductCategories(params);
//             set(() => ({
//                 data: response.content,
//                 isLoading: false,
//                 error: null,
//             }));
//         } catch (error) {
//             set(() => ({
//                 isLoading: false,
//                 error: error.message,
//             }));
//         }
//     },
// }));
