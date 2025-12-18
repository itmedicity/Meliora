import { axioslogin } from "../Axios/Axios"

export const getVarationData = async () => {
    return axioslogin.get('/RateVariationReport/selectRateVariation').then(res => {
        const { success, data } = res.data
        if (success === 1 && data.length > 0) {
            return data
        } else {
            return []
        }
    })
}


export const getRateVariationComments = async (slno) => {
    return axioslogin.get(`RateVariationReport/getCommentsbyID/${slno}`).then(res => {
        const { success, data } = res.data
        if (success === 1 && data.length > 0) {
            return data
        } else {
            return []
        }
    })
}


export const getStoreUserRights = async (loginId) => {
    return axioslogin.post('/store_master/StoreReportRights', { loginId }).then(res => {
        const { success, data } = res.data
        if (success === 1 && data.length > 0) {
            const rights = JSON?.parse(data[0]?.store_report_view)
            return rights
        } else {
            return []
        }
    })
}

//resolved list
export const ratevariationResolved = async () => {
    return axioslogin.get('/RateVariationReport/ratevariationResolvedList').then(res => {
        const { success, data } = res.data
        if (success === 1 && data.length > 0) {
            return data
        } else {
            return []
        }
    })
}
