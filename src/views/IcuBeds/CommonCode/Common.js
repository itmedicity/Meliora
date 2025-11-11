import { axiosellider } from "src/views/Axios/Axios";

export const getElliderAllIcuBeds = async () => {
    try {
        const res = await axiosellider.get('/medlab/geticubeds');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data?.length > 0) return data;
    } catch (error) {
        console.error("Error fetching Icu Beds:", error?.message || error);
        return [];
    }
};