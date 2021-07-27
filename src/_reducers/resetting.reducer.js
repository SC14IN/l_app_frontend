import { userConstants } from '../_constants';

export function resetting(state = {}, action) {
  switch (action.type) {
    case userConstants.RESET_REQUEST:
      return { reset: true };
    case userConstants.RESET_SUCCESS:
      return {};
    case userConstants.RESET_FAILURE:
      return {};
    default:
      return state
  }
}