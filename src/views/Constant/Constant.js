import { axioslogin } from "../Axios/Axios"

//Get login employee No
export const employeeNumber = () => {
    const userinfo = sessionStorage.getItem('userDetl');
    const employeNumber = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empno : 0;
    return employeNumber;
};

//GET ASSINED MENU LIST
export const getMenuSlno = async () => {
    const result = await axioslogin.get(`/common/getempid/${employeeNumber()}`)
    const { success, data } = result.data
    if (success === 1) {
        const { em_id } = data[0]
        const results = await axioslogin.get(`/common/getMenu/${em_id}`)
        const { resdata } = results.data;
        return resdata;
    }
}

export const getempid = async () => {
    const result = await axioslogin.get('/common/getSerialno')
    const { success } = result.data;
    if (success === 1) {
        const [serial_current] = result.data.data
        return serial_current.serial_current
    }
}

//get department id
export const getDepartmentId = async () => {
    const result = await axioslogin.get('/deptmaster/deptid')
    const { success } = result.data
    if (success === 1) {
        const [serial_current] = result.data.data
        return serial_current.serial_current
    }
}
//get department section id
export const getDepartmentsectionId = async () => {
    const result = await axioslogin.get('/deptsecmaster/deptsecid/id')
    const { success, data } = result.data
    if (success === 1) {
        const { serial_current } = data[0]
        return serial_current;
    }
}

