import { userConstants } from '../_constants';

export function edit(state = {}, action) {
  switch (action.type) {
    case userConstants.EDIT_REQUEST:
      return { ...state,edit: true,job:action.job };
    case userConstants.EDIT_SUCCESS:
      return {...state};
    case userConstants.EDIT_FAILURE:
      return {...state};
    default:
      return state
  }
}