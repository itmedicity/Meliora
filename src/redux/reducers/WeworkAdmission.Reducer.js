import { ActionTyps } from "../constants/action.type";
const { FETCH_TOTAL_ADMISSION } = ActionTyps
//intial state

const Dashboard = {
    74: { slno: 74, name: "Total Admission", count: 0, status: true },
}

export const getTotalAdmission = (state = Dashboard, { type, payload, status }) => {
    switch (type) {
        case FETCH_TOTAL_ADMISSION:
            return { ...state, 67: { slno: 74, name: "Total Admission", count: payload, status: status } }
        default:
            return state
    }

}