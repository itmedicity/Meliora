import {  axioslogin } from "src/views/Axios/Axios"

export const getAlllCompletedTask= async (searchAllCompletedTask) => {    
    return axioslogin.post('/taskManagement/getAllCompletedTasks', searchAllCompletedTask).then((res) => {
        const { success, data } = res.data        
        if (success === 1) {
            return data
        }
        else if(success===2){
            return ;
        }
        else{
              return ;
        }
    })
}

export const getAllSubtaskUnderTask= async (searchData) => {
    return axioslogin.post('/taskManagement/subtaskUnderdepSec', searchData).then((res) => {
        const { success, data } = res.data
        if (success === 2) {
            return data
        }          
        else{
              return ;
        }
    })
}

export const getEmpAllTasks = async id => {
  return axioslogin.get(`/TmTableView/employeeAllTask/${id}`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }else{
        return;
    }
  })
}

export const getAllTaskUnderDepartment = async empDept => {
  return axioslogin.get(`/taskManagement/viewMasterTaskByDeptId/${empDept}`).then(res => {
    const { success, data } = res.data   
    if (success === 2) {
      return data
    }else{
        return;
    }
  })
}

export const getAllOverDueTaskUnderDepartment = async empDept => {
  return axioslogin.get(`/TmTableView/deptOverDue/${empDept}`).then(res => {
    const { success, data } = res.data   
    
    if (success === 2) {
      return data
    }else{
        return;
    }
  })
}