import { axioslogin } from "src/views/Axios/Axios"

export const getComplaintDepartmentData = async () => {
    return axioslogin.get('/complaintdept').then((res) => {
        const { success, data } = res.data
        if (success === 1) {
            return data
        }
    })
}