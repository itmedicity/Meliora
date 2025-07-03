import { ActionTyps } from '../constants/action.type'
const { FETCH_ASSISTANT_EMPLOYEE } = ActionTyps
//intial state
const assistantemp = {
  assistantempList: [],
  loadingStatus: false,
}
/***  assistantemp action type check then payload set to the state and loading status set as true */
export const getAssistantemployee = (state = assistantemp, { type, payload }) => {
  switch (type) {
    case FETCH_ASSISTANT_EMPLOYEE:
      return { ...state, assistantempList: payload, loadingStatus: true }
    default:
      return state
  }
}
