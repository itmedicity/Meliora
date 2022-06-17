import { axioslogin } from "../Axios/Axios"

// ----------- Api Address ---------------
export const API_URL = 'http://192.168.11.42:5000/api';
// ----------- Nas Folder --------------
export const PUBLIC_NAS_FOLDER = "http://*.*.*.*/NAS/";
//Get login employee No
export const employeeNumber = () => {
    const userinfo = sessionStorage.getItem('userDetl');
    const employeNumber = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empno : 0;
    return employeNumber;
};

//GET ASSINED MENU LIST

// export const getMenuSlno = async () => {
//     const result = await axioslogin.get(`/common/getempid/${employeeNumber()}`)
//     const { success, data } = result.data
//     console.log(data);
//     if (success === 1) {
//         const { emp_id } = data[0]
//         const results = await axioslogin.get(`/grprights/${emp_id}`)
//         const { resdata } = results.data;
//         return resdata;
//     }
// }

export const getMenuSlno = async () => {

    const results = await axioslogin.get(`/common/menuname`)
    const { data } = results.data;
    console.log(data);
    return data;
}


