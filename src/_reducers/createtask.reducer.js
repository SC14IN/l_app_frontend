import { userConstants } from '../_constants';

export function createtask(state = {}, action) {
  switch (action.type) {
    case userConstants.CREATETASK_REQUEST:
      return { ...state,create: true };
    case userConstants.CREATETASK_SUCCESS:
      return {state};
    case userConstants.CREATETASK_FAILURE:
      return {state};
    default:
      return state
  }
}