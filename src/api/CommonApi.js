import { axioslogin } from "src/views/Axios/Axios"

export const getComplaintDepartmentData = async () => {
    return axioslogin.get('/complaintdept').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}

export const getDeptwiseBackUp = async (empDept) => {
    return axioslogin.get(`/backupdetails/getDeptwiseBackup/${empDept}`).then((res) => {
        const { success, data } = res.data;
        if (success === 2) {
            return data;
        }
    })
}
