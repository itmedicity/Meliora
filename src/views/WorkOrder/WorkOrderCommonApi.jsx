import { axioslogin } from "../Axios/Axios"

// export const getWorkOrderData = async () => {
//     return axioslogin.get('/workOrder/getWorkOrderDetails').then(res => {
//         const { success, data } = res.data
//         if (success === 1 && data.length > 0) {
//             return data
//         } else {
//             return []
//         }
//     })
// }
export const getWorkOrderData = async (level_no) => {
    return axioslogin
        .get('/workOrder/getWorkOrderDetails', {
            params: {
                level_no, // 👈 backend will receive this
            },
        })
        .then(res => {
            const { success, data } = res.data;
            if (success === 1 && data?.length > 0) {
                return data;
            } else {
                return [];
            }
        });
};


export const getmaterialDetails = async (wo_slno) => {
    return axioslogin.get(`/workOrder/getmaterialData/${wo_slno}`).then(res => {
        const { success, data } = res.data
        if (success === 1 && data.length > 0) {
            return data
        } else {
            return []
        }
    })
}

export const getLastWOnumber = async () => {
    return axioslogin.get(`/workOrder/getLastWoNumber`).then(res => {
        const { success, data } = res.data
        if (success === 1 && data.length > 0) {
            return data
        } else {
            return []
        }
    })
}
