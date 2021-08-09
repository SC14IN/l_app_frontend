import { userConstants } from '../_constants';

export function overview(state = {}, action) {
  switch (action.type) {
    case userConstants.OVERVIEW_REQUEST:
      return { ...state,overview: true,overviewId:action.id };
    default:
      return state
  }
}