import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ASSET_ITEM_TYPE } = ActionTyps


export const getAmItemType = () => async (dispatch) => {
    const result = await axioslogin.get('/amSelectComponent/ItemTypeDropdown');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ASSET_ITEM_TYPE, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ASSET_ITEM_TYPE, payload: [], loadingStatus: false })
    }
}