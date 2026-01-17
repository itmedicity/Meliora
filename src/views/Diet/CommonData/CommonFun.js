import { axioslogin } from "src/views/Axios/Axios";

export const DietFoodFetching = async () => {
    try {
        const result = await axioslogin.get('/kotitem/get/kotitem')
        const { success, data } = result.data
        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Detail:", error?.message || error);
        return [];
    }
};




export const DietItemType = async () => {
    try {
        const result = await axioslogin.get('/itemgrp/getitem')
        const { success, data } = result.data
        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Item Type Detail:", error?.message || error);
        return [];
    }
};



export const GetAllRoomTypeDetail = async () => {
    try {
        const result = await axioslogin.get('/kotitem/room/getallroomtype')
        const { success, data } = result.data
        console.log({
            data
        });

        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error In Fetching Item Type Detail:", error?.message || error);
        return [];
    }
};