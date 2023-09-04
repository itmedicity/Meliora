import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ASSET_MODEL } = ActionTyps


export const getAmModel = () => async (dispatch) => {
    const result = await axioslogin.get('/amSelectComponent/modelDropDown');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ASSET_MODEL, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ASSET_MODEL, payload: [], loadingStatus: false })
    }
}