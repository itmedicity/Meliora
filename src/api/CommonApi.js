import { axioslogin } from 'src/views/Axios/Axios'

export const getComplaintDepartmentData = async () => {
  return axioslogin.get('/complaintdept').then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
  })
}
export const getCategoryDetails = async postData => {
  return axioslogin.post('/Amdashboard/getCategoryDetails', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getCategoryDetailsSpare = async postData => {
  return axioslogin.post('/Amdashboard/getCategoryDetailsSpare', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAssetCount = async postData => {
  return axioslogin.post('/Amdashboard/getAssetCount', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      const { total_count } = data[0]
      return total_count
    }
  })
}
export const getSpareCount = async postData => {
  return axioslogin.post('/Amdashboard/getSpareCount', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      const { total_count } = data[0]
      return total_count
    }
  })
}
export const getAssetValue = async postData => {
  return axioslogin.post('/Amdashboard/getAssetValue', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getSpareValue = async postData => {
  return axioslogin.post('/Amdashboard/getSpareValue', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    } else {
      return [];
    }
  })
}
export const getTotAssetValue = async () => {
  return axioslogin.get('/Amdashboard/getTotAssetValue').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getTotSpareValue = async () => {
  return axioslogin.get('/Amdashboard/getTotspareValue').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getTotAssetCount = async () => {
  return axioslogin.get('/Amdashboard/getTotAssetCount').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getTotSpareCount = async () => {
  return axioslogin.get('/Amdashboard/getTotSpareCount').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAssetItemType = async () => {
  return axioslogin.get('itemtype/view').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAssetType = async () => {
  return axioslogin.get('assettypee/view').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getCategory = async () => {
  return axioslogin.get('amcategory/view').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getTotalCountItemType = async () => {
  return axioslogin.get('/Amdashboard/getTotalCountItemType').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getTotalCountAssetType = async () => {
  return axioslogin.get('/Amdashboard/getTotalCountAssetType').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getDeptwiseBackUp = async empDept => {
  return axioslogin.get(`/backupdetails/getDeptwiseBackup/${empDept}`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getAllAmcCmcUnderCustodian = async postData => {
  return axioslogin.post('/Amdashboard/getAllAmcCmcUnderCustodian', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getExpiredAmcCmc = async postData => {
  return axioslogin.post('/Amdashboard/getExpiredAmcCmc', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    } else {
      return []
    }
  })
}

export const getActiveItemsWarrentyGaurentee = async postData => {
  return axioslogin.post('/Amdashboard/getActveitemsWarrentyGaurentee', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getExpiredWarGaur = async postData => {
  return axioslogin.post('/Amdashboard/getExpiredWarGaur', postData).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAllPendingComplaints = async empsecid => {
  return axioslogin.get(`/complaintreg/loginbysec/${empsecid}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
  })
}
export const getDirectPendingCompalints = async () => {
  return axioslogin.get('complaintreg/viewAllPendingTicket').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getDepartmentMaster = async () => {
  return axioslogin.get('/melioraDepMaster/DeptMasterGet').then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
  })
}

export const getDepartmentSectionMaster = async () => {
  return axioslogin.get('/melioraDepMaster/DeptSecMasterGet').then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
  })
}

export const getDepSecIDMaster = async empsecid => {
  return axioslogin.get(`/melioraDepMaster/DeptSecMasterGetID/${empsecid}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    } else {
      return []
    }
  })
}

export const getMelDepSecEmp = async secid => {
  return axioslogin.get(`/melioraDepMaster/Melempdeptsec/${secid}`).then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    } else {
      return []
    }
  })
}

export const getallEmployeDetails = async () => {
  return axioslogin.get('/employee/getall').then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
    else {
      return []
    }
  })
}

export const getMeLInchHODAuthorization = async () => {
  return axioslogin.get('/InchHODAuthorization/GetInchHODAuthMeliora').then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    }
    else {
      return []
    }
  })
}

export const getcontractItems = async () => {
  return axioslogin.get('/ContractMaster/GetcontractMaster').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
    else {
      return []
    }
  })
}

export const getlocationItems = async () => {
  return axioslogin.get('/ContractMaster/GetlocationMaster').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
    else {
      return []
    }
  })
}