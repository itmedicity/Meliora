import { ActionTyps } from "../constants/action.type";
const { FETCH_ASSIGNEDLIST } = ActionTyps
//intial state
const assignedcmp = {
    assignedcmpLists: [],
    loadingStatus: false
}
export const getAssignedComplaintLists = (state = assignedcmp, { type, payload }) => {
    switch (type) {
        case FETCH_ASSIGNEDLIST:
            return { ...state, assignedcmpLists: payload, loadingStatus: true }
        default:
            return state
    }

}

