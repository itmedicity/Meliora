import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ASSET_UOM } = ActionTyps


export const getUOM = () => async (dispatch) => {
    const result = await axioslogin.get('/amSelectComponent/uomDropDown');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ASSET_UOM, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ASSET_UOM, payload: [], loadingStatus: false })
    }
}