import { axiosellider } from "src/views/Axios/Axios";

export const getAllIcuBeds = async () => {
    try {
        const res = await axiosellider.get('/medlab/geticubeds');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};