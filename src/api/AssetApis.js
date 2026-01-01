import { axioslogin } from 'src/views/Axios/Axios'

export const getSpecification = async am_item_map_slno => {
  return axioslogin.get(`/ItemMapDetails/SpecificationInsertOrNot/${am_item_map_slno}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
  })
}

export const getallSpareUnderAsset = async am_item_map_slno => {
  return axioslogin.get(`/complaintreg/SpareDetailsUndercomplaint/${am_item_map_slno}`).then(res => {
    const { success, data } = res.data  
        if (success === 1) {
      return data
    }
    else{
      return[]
    }
  })
}

export const getAllAboutAsset = async postData => {
  return axioslogin.post('/assetSpareDetails/getAssetAlllDetails', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
    else{
       return []
    }
  })
}

export const getCustodianDept = async () => {
  return axioslogin.get(`/CustodianDeptMast/select`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getWarrGarAsset = async am_item_map_slno => {
  return axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNot/${am_item_map_slno}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
    else{
       return []
    }
  })
}

export const getWarrGarSpare = async am_spare_item_map_slno => {
  return axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNotSpare/${am_spare_item_map_slno}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getDetailsAsset = async am_item_map_slno => {
  return axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}
export const getDetailsSpare = async am_spare_item_map_slno => {
  return axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNotSpare/${am_spare_item_map_slno}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getAmcCmcPmData = async am_item_map_slno => {
  return axioslogin.get(`/ItemMapDetails/AmcPmInsertOrNot/${am_item_map_slno}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getCustodianDetails = async custodianDept => {
  return axioslogin.get(`/CustodianDeptMast/selectById/${custodianDept}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    } else {
      return []
    }
  })
}

export const getPMDetailList = async am_item_map_slno => {
  return axioslogin.get(`/ItemMapDetails/PmDetailsList/${am_item_map_slno}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}
export const getLeaseDetailList = async am_item_map_slno => {
  return axioslogin.get(`/ItemMapDetails/LeaseDetailsList/${am_item_map_slno}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getPendingDetailentryAsset = async postData => {
  return axioslogin.post('/assetSpareDetails/getPendingAsset', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
        else{
       return []
    }
  })
}

export const getPendingDetailentrySpare = async postData => {
  return axioslogin.post('/assetSpareDetails/getPendingSpare', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
        else{
       return []
    }
  })
}
export const getAssetLocationDetailsz = async postAssetNoData => {
  return axioslogin.post('/assetDeptTransfer/getAssetLocationDetails', postAssetNoData).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getSpareUnderCondmnation = async empdept => {
 const res = await axioslogin.get(`/SpareCondemService/CondemnationList/${empdept}`)
  const { success, data } = res.data
  if (success === 1) {
    return data
  } else {
    return [] 
  }
}

export const getAssetUnderCondmnation = async (empdept) => {
  const res = await axioslogin.get(`/SpareCondemService/getAssetCondemnationList/${empdept}`)
  const { success, data } = res.data
  if (success === 1) {
    return data
  } else {
    return [] 
  }
}



export const getArrayOfAssetLocationDetails = async postArrayOfAssetNo => {
  return axioslogin.post('/assetDeptTransfer/getArrayOfAssetLocationDetails', postArrayOfAssetNo).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getcustodianTransferHistory = async postData => {
  return axioslogin.post('/assetDeptTransfer/getcustodianTransferhistory', postData).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getSparesInstock = async postData => {
  return axioslogin.post('/ItemMapDetails/GetFreespareList', postData).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getAssetInstock = async postData => {
  return axioslogin.post('assetSpareDetails/getAssetListUnderCustodianDetails', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
   else{
       return []
    }
  })
}

export const getDeptSecAssetList = async searchhData => {
  return axioslogin.post('/assetDeptTransfer/getAssetOnSection', searchhData).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
        else{
       return []
    }
  })
}

export const getCondemAddedDetails = async postCondemSlno => {
  return axioslogin.post('/AssetCondemnation/getItemDetails', postCondemSlno).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getCondemSlno = async postCondemMast => {
  return axioslogin.post('/AssetCondemnation/getItemSlno', postCondemMast).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getCondemPendingDatas = async postCondemDept => {
  return axioslogin.post('/AssetCondemnation/getpendingApprovals', postCondemDept).then(res => {
    const { success, data } = res.data 
    if (success === 2) {
      return data
    }
  })
}

export const getItemUnderForm = async postCondemSlno => {
  return axioslogin.post('/AssetCondemnation/getItemUnderForm', postCondemSlno).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getAllDeptCondemPendingDatas = async postCondemAllDept => {
  return axioslogin.post('/AssetCondemnation/getAllpendingApprovals', postCondemAllDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAllDeptCondemList = async postAllDeptcondemList => {
  return axioslogin.post('/AssetCondemnation/getCondemnationList', postAllDeptcondemList).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
  })
}

export const getDeptScrapStore = async postDept => {
  return axioslogin.post('/AssetCondemnation/getDeptScrapStore', postDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getTopActiveCondemnationLevel = async () => {
  return axioslogin.get(`/condemApprovalLevel/getTopActiveCondemnationLevel`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getActiveCondemnationLevels = async () => {
  return axioslogin.get(`/condemApprovalLevel/getCondemnActiveApprovalLevel`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getcondemnAllApproved = async postDataa => {
  return axioslogin.post('/AssetCondemnation/getAllDeptApprovedOrRejected', postDataa).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
    else{
      return []
    }
  })
}

export const getActiveCondemnationLevel = async () => {
    return axioslogin.get(`/condemApprovalLevel/getActiveCondemnationLevel`).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getScrapNotCategorized = async () => {
    return axioslogin.get(`/AssetCondemnation/getScrapNotUnderCategorization`).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}
export const getAddedItemNotCategorized = async () => {
    return axioslogin.get(`/AssetCondemnation/getAddedScrapNotUnderCategorization`).then((res) => {
        const { success, data } = res.data        
        if (success === 2) {
            return data
        }
    })
}

export const getcondemdAssetCategoryWiseDashboard = async () => {
    return axioslogin.get(`/AssetCondemnation/getcondemdAssetCategoryWiseDashboard`).then((res) => {
        const { success, data } = res.data        
        if (success === 2) {
            return data
        }
    })
}

export const getSubmittedScarpForms = async () => {
    return axioslogin.get(`/AssetCondemnation/getSubmittedScarpForms`).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }
    })
}

export const getscrapItemRateDetails= async postScrapFormNo => {
  return axioslogin.post('/condemMasters/getscrapItemRateDetail', postScrapFormNo).then(res => {
    const { success, data } = res.data 
      if (success === 2) {
      return data
    }
  })
}


export const getAssetItemUnderCustoidian = async custoDian => {
 const res = await axioslogin.get(`/amSelectComponent/AssetItemUnderCustoidian/${custoDian}`)
  const { success, data } = res.data
  if (success === 1) {
    return data
  } else {
    return [] 
  }
}

export const getSpareItemUnderCustoidian = async (custoDian) => {
  const res = await axioslogin.get(`/amSelectComponent/SpareItemUnderCustoidian/${custoDian}`)
  const { success, data } = res.data
  if (success === 1) {
    return data
  } else {
    return [] 
  }
}