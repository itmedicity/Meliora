import { ActionTyps } from "../constants/action.type";
const { FETCH_ASSISTLIST } = ActionTyps
//intial state
const assistcmp = {
    assistcmpLists: [],
    loadingStatus: false
}
export const getAssistComplaintLists = (state = assistcmp, { type, payload }) => {
    switch (type) {
        case FETCH_ASSISTLIST:
            return { ...state, assistcmpLists: payload, loadingStatus: true }
        default:
            return state
    }

}