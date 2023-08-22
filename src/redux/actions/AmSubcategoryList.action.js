import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_ASSET_SUBCATEGORY } = ActionTyps


export const getAmSubcategory = (category) => async (dispatch) => {
    const result = await axioslogin.get(`/amSelectComponent/subcategoryDropdown/${category}`);
    const { success, data } = result.data
    if (success === 1) {
        dispatch({ type: FETCH_ASSET_SUBCATEGORY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ASSET_SUBCATEGORY, payload: [], loadingStatus: false })
    }
}