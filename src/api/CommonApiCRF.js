import { axioslogin } from "src/views/Axios/Axios"

export const getDptSecIcharge = async (id) => {
    return axioslogin.get(`/InchHODAuthorization/getDeptSeconIncharge/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getDptSecHod = async (id) => {
    return axioslogin.get(`/InchHODAuthorization/getDeptSeconHod/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}
export const getCRFInchargeHodData = async (deptsecArry) => {
    return axioslogin.post('/newCRFRegister/getAllReqBasedDept', deptsecArry).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getCRFPendingAboveHOD = async (postData) => {
    return axioslogin.post('/newCRFRegister/getPendingList', postData).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getDataCollectionDetails = async (id) => {
    return axioslogin.get(`/CRFRegisterApproval/getDataCollectList/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getCRFPurchaseAck = async () => {
    return axioslogin.get('/newCRFPurchase/getPurchaseAckPending').then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getCRFQuotationDetails = async () => {
    return axioslogin.get('/newCRFPurchase/getAllApprovedForPurchase').then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getCrfPoApprovals = async () => {
    return axioslogin.get('/newCRFPurchase/POPending').then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getStoreList = async () => {
    return axioslogin.get('/newCRFPurchase/crsStores').then((result) => {
        const { success, data } = result.data
        if (success === 2) {
            return data
        } else {
            return []
        }
    })
}

export const getPurchaseDataCollection = async () => {
    return axioslogin.get('/newCRFPurchase/PurchsDataCollectionPending').then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}
// for crf reg
export const getInchHodAuthorization = async (deptSec) => {
    return axioslogin.get(`/newCRFRegister/InHodExist/${deptSec}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}
// for crf reg
export const getAuthorisedDeptsec = async (id) => {
    return axioslogin.get(`/InchHODAuthorization/getDeptSeconId/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}
// crf Reg, View table data
export const getCrfRegDetailByDepSec = async (id) => {
    return axioslogin.get(`/newCRFRegister/getAllReqBasedDeptreq/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

// delivery Marking dashbord view
export const getDeliveryMarking = async (postData) => {
    return axioslogin.post('/CRFDashboard/delivery', postData).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

// item Checking
export const getItemChecking = async (postData) => {
    return axioslogin.post('/CRFDashboard/checkItem', postData).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}
// store Acknowledge
export const getStoreAcknow = async (postData) => {
    return axioslogin.post('/CRFDashboard/storeack', postData).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

// User Acknowledge
export const getUserAcknow = async (postData) => {
    return axioslogin.post('/CRFDashboard/userack', postData).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

// completed CRF
export const getCompletedCRF = async (postData) => {
    return axioslogin.post('/CRFDashboard/compCRF', postData).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }

    })
}
// get approved,reject and onhold item details for edit
export const getApprovedCrfItems = async (id) => {
    return axioslogin.get(`/CRFRegisterApproval/getItemListApproval/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getApprovedStatus = async (id) => {
    return axioslogin.get(`/CRFRegisterApproval/getItemStatus/${id}`).then((result) => {
        const { successs, data } = result.data
        if (successs === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getMaxslNoOfCrfItem = async (id) => {
    return axioslogin.get(`/CRFRegisterApproval/getMaxItemSlno/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}
// get ack from store to reply user
export const getUserAckDetails = async (id) => {
    return axioslogin.get(`/newCRFStore/viewStoreAck/${id}`).then((result) => {
        const { success, datas } = result.data
        if (success === 1) {
            return datas
        } else {
            return []
        }
    })
}
export const getStoreReceivedItemDetails = async (id) => {
    return axioslogin.get(`/newCRFStore/storeReceivedItem/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}


export const getCompanyDetails = async () => {
    return axioslogin.get('/companyMast/active').then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getSupplierList = async () => {
    return axioslogin.get('/deliveryMarking/supplier').then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const itemReturnDetailsForViewStore = async (postData) => {
    return axioslogin.post('/newCRFRegister/returnPending', postData).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const viewItemReturnDetails = async (id) => {
    return axioslogin.get(`/newCRFRegister/returnView/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}

export const getSubStoreCrfDetails = async () => {
    return axioslogin.get('/newCRFStore/crfPOView').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}


export const getDefaultCompany = async () => {
    return axioslogin.post('/newCRFRegister/CommonMasterSettingGet').then((res) => {
        const { success, data } = res.data
        if (success === 1 && data.length > 0) {
            return data[0]
        } else {
            return []
        }
    })
}


export const getdefaultRights = async (id) => {
    return axioslogin.get(`/newCRFRegister/datacollectionRights/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data
        } else {
            return []
        }
    })
}
export const getDatakmcDep = async (id) => {
    return axioslogin.get(`/CRFRegisterApproval/getDatakmcDep/${id}`).then((result) => {
        const { success, data } = result.data
        if (success === 1) {
            return data[0]
        } else {
            return []
        }
    })
}
