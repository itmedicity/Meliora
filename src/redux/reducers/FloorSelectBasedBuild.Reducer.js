import { ActionTyps } from '../constants/action.type'
const { FETCH_FLOOR_BASED_BUILD } = ActionTyps;
//intial state
const FloorBasedOnBuild = {
    FloorBasedOnBuildList: [],
    loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getFloorBasedOnBuild = (state = FloorBasedOnBuild, { type, payload }) => {
    switch (type) {
        case FETCH_FLOOR_BASED_BUILD:
            return { ...state, FloorBasedOnBuildList: payload, loadingStatus: true }
        default:
            return state
    }
}