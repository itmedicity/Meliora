import { ActionTyps } from '../constants/action.type'

const { FETCH_CHANGE_STATE } = ActionTyps

const initialState = {
  aggridstate: 0
}

export const changeStateAggrid = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case FETCH_CHANGE_STATE:
      return { ...state, ...rest }
    default:
      return state
  }
}
