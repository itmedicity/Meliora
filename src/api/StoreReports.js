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