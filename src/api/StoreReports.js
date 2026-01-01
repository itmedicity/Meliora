import { axiosellider } from "src/views/Axios/Axios"

export const fetchPurchaseMast = async (filterParams) => {
    return axiosellider.post('/storeReport/getPurchaseMastDatas', filterParams).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
        else {
            return []
        }
    })
}


export const getPendingApprovalQtn = async () => {
    return axiosellider.get('/storeReport/getpendingApprovalQtn').then(res => {
        const { success, data } = res.data;

        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data.sort(
                (a, b) => new Date(a["QUOTATION DATE"]) - new Date(b["QUOTATION DATE"])
            );
        } else {
            return [];
        }
    });
};



