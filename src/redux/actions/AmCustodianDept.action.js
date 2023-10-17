import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_AM_CUSTODIAN_DEPT } = ActionTyps


export const getCustodianDept = () => async (dispatch) => {
    const result = await axioslogin.get('/CustodianDeptMast/select');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_AM_CUSTODIAN_DEPT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_AM_CUSTODIAN_DEPT, payload: [], loadingStatus: false })
    }
}