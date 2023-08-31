import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ASSET_MANUFACTURE } = ActionTyps


export const getAmManufacture = () => async (dispatch) => {
    const result = await axioslogin.get('/amSelectComponent/manufatureDropdown');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ASSET_MANUFACTURE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ASSET_MANUFACTURE, payload: [], loadingStatus: false })
    }
}