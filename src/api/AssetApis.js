import { axioslogin } from "src/views/Axios/Axios"

export const getSpecification = async (am_item_map_slno) => {
    return axioslogin.get(`/ItemMapDetails/SpecificationInsertOrNot/${am_item_map_slno}`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getallSpareUnderAsset = async (am_item_map_slno) => {
    return axioslogin.get(`/complaintreg/SpareDetailsUndercomplaint/${am_item_map_slno}`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getAllAboutAsset = async (postData) => {
    return axioslogin.post('/assetSpareDetails/getAssetAlllDetails', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}

export const getCustodianDept = async () => {
    return axioslogin.get(`/CustodianDeptMast/select`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getWarrGarAsset = async (am_item_map_slno) => {
    return axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNot/${am_item_map_slno}`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getWarrGarSpare = async (am_spare_item_map_slno) => {
    return axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNotSpare/${am_spare_item_map_slno}`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getDetailsAsset = async (am_item_map_slno) => {
    return axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}
export const getDetailsSpare = async (am_spare_item_map_slno) => {
    return axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNotSpare/${am_spare_item_map_slno}`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getAmcCmcPmData = async (am_item_map_slno) => {
    return axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNot/${am_item_map_slno}`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}


export const getCustodianDetails = async (custodianDept) => {
    return axioslogin.get(`/CustodianDeptMast/selectById/${custodianDept}`).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}


export const getPMDetailList = async (am_item_map_slno) => {
    return axioslogin.get(`/ItemMapDetails/PmDetailsList/${am_item_map_slno}`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data;
        }
    })
}
export const getLeaseDetailList = async (am_item_map_slno) => {
    return axioslogin.get(`/ItemMapDetails/LeaseDetailsList/${am_item_map_slno}`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data;
        }
    })
}

export const getPendingDetailentryAsset = async (postData) => {
    return axioslogin.post('/assetSpareDetails/getPendingAsset', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}

export const getPendingDetailentrySpare = async (postData) => {
    return axioslogin.post('/assetSpareDetails/getPendingSpare', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getAssetLocationDetailsz = async (postAssetNoData) => {
    return axioslogin.post('/assetDeptTransfer/getAssetLocationDetails', postAssetNoData).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getSpareUnderCondmnation = async (empdept) => {
    return axioslogin.get(`/SpareCondemService/CondemnationList/${empdept}`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data;
        }
    })
}
export const getAssetUnderCondmnation = async (empdept) => {
    return axioslogin.get(`/SpareCondemService/getAssetCondemnationList/${empdept}`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data;
        }
    })
}
export const getArrayOfAssetLocationDetails = async (postArrayOfAssetNo) => {
    return axioslogin.post('/assetDeptTransfer/getArrayOfAssetLocationDetails', postArrayOfAssetNo).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}


export const getcustodianTransferHistory = async (postData) => {
    return axioslogin.post('/assetDeptTransfer/getcustodianTransferhistory', postData).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}


export const getSparesInstock = async (postData) => {
    return axioslogin.post('/ItemMapDetails/GetFreespareList', postData).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}


export const getAssetInstock = async (postData) => {
    return axioslogin.post('assetSpareDetails/getAssetListUnderCustodianDetails', postData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}

export const getDeptSecAssetList = async (searchhData) => {
    return axioslogin.post('/assetDeptTransfer/getAssetOnSection', searchhData).then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

