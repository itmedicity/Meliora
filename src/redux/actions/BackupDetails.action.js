import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_BACKUP_DETAILS, FETCH_BACKUP_EMPLOYEE } = ActionTyps


export const getBackupDetails = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdetails/select');
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_DETAILS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_DETAILS, payload: [], loadingStatus: false })
    }
}
// export const getEmployeeBackup = () => async (dispatch) => {
//     const result = await axioslogin.get('/verification/getemp');
//     const { success, data } = result.data
//     if (success === 2) {
//         dispatch({ type: FETCH_BACKUP_EMPLOYEE, payload: data, loadingStatus: true })
//     }
//     else {
//         dispatch({ type: FETCH_BACKUP_EMPLOYEE, payload: [], loadingStatus: false })
//     }
// }

export const getEmployeeBackup = (empDept) => async (dispatch) => {
    const result = await axioslogin.get(`/verification/getemp/${empDept}`);
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_EMPLOYEE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_EMPLOYEE, payload: [], loadingStatus: false })
    }

}