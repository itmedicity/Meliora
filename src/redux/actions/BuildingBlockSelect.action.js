import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_BUILDING_BLOCK_SELECT } = ActionTyps
export const getBuildingBlock = () => async (dispatch) => {
    const result = await axioslogin.get('/selectComponent/buildingBlockDropdown');
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_BUILDING_BLOCK_SELECT, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BUILDING_BLOCK_SELECT, payload: [], loadingStatus: false })
    }
}