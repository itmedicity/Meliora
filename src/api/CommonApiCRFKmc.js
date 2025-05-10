import { axioskmc } from "src/views/Axios/Axios"


export const getCRFPendingForAllKMC = async (postData) => {
    return axioskmc.post('/newCRFRegister/getPendingList', postData).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getApprovedItemsKMC = async (id) => {
    return axioskmc.get(`/CRFRegisterApproval/getItemListApproval/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getApprovedStatusKMC = async (id) => {
    return axioskmc.get(`/CRFRegisterApproval/getItemStatus/${id}`).then((result) => {
        const { successs, data } = result.data
        if (successs === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getMaxItemslNoKMC = async (id) => {
    return axioskmc.get(`/CRFRegisterApproval/getMaxItemSlno/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getDatakmcCollectionDetails = async (id) => {
    return axioskmc.get(`/CRFRegisterApproval/getDataCollectList/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}


export const getApprovedCrfItemskmc = async (id) => {
    return axioskmc.get(`/CRFRegisterApproval/getItemListApproval/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getMaxslNoOfCrfItemkmc = async (id) => {
    return axioskmc.get(`/CRFRegisterApproval/getMaxItemSlno/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getApprovedStatuskmc = async (id) => {
    return axioskmc.get(`/CRFRegisterApproval/getItemStatus/${id}`).then((result) => {
        const { successs, data } = result.data
        if (successs === 1) {
            return data
        } else {
            return []
        }
    })
}