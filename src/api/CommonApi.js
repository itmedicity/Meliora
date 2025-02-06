import { axioslogin } from "src/views/Axios/Axios"

export const getComplaintDepartmentData = async () => {
    return axioslogin.get('/complaintdept').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}
export const getCategoryDetails = async (postData) => {
    return axioslogin.post('/Amdashboard/getCategoryDetails', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getCategoryDetailsSpare = async (postData) => {
    return axioslogin.post('/Amdashboard/getCategoryDetailsSpare', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getAssetCount = async (postData) => {
    return axioslogin.post('/Amdashboard/getAssetCount', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            const { total_count } = data[0]
            return total_count
        }
    })
}
export const getSpareCount = async (postData) => {
    return axioslogin.post('/Amdashboard/getSpareCount', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            const { total_count } = data[0]
            return total_count
        }
    })
}
export const getAssetValue = async (postData) => {
    return axioslogin.post('/Amdashboard/getAssetValue', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getSpareValue = async (postData) => {
    return axioslogin.post('/Amdashboard/getSpareValue', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getTotAssetValue = async () => {
    return axioslogin.get('/Amdashboard/getTotAssetValue').then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getTotSpareValue = async () => {
    return axioslogin.get('/Amdashboard/getTotspareValue').then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getTotAssetCount = async () => {
    return axioslogin.get('/Amdashboard/getTotAssetCount').then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getTotSpareCount = async () => {
    return axioslogin.get('/Amdashboard/getTotSpareCount').then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getAssetItemType = async () => {
    return axioslogin.get('itemtype/view').then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getAssetType = async () => {
    return axioslogin.get('assettypee/view').then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getCategory = async () => {
    return axioslogin.get('amcategory/view').then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getTotalCountItemType = async () => {
    return axioslogin.get('/Amdashboard/getTotalCountItemType').then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getTotalCountAssetType = async () => {
    return axioslogin.get('/Amdashboard/getTotalCountAssetType').then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}






