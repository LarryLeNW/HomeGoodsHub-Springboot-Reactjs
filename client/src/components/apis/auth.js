import axios from "axios";

import { toast } from "react-toastify";

export const getCurrent = async ({}) => {
    try {
        const response = await axios.get(
            "http://localhost:8080/api/login/getCurrent",
            {
                withCredentials: true,
            }
        );
        console.log("🚀 ~ getCurrent ~ response:", response);
    } catch (error) {
        console.log("🚀 ~ getCurrent ~ error:", error);
    }
};
