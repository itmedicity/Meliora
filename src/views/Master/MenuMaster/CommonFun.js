import { axioslogin } from "src/views/Axios/Axios";

export const fetchAllMenuDetail = async () => {
    try {
        const res = await axioslogin.get('/menumaster/menu/getallmenu');
        const { success, data } = res.data || {};
        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all Menus:", error?.message || error);
        return [];
    }
};