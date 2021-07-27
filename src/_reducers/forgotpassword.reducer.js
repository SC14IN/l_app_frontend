import { userConstants } from '../_constants';

export function forgotpassword(state = {}, action) {
  switch (action.type) {
    case userConstants.FORGOTPASS_REQUEST:
      return { forgotpass: true };
    case userConstants.FORGOTPASS_SUCCESS:
      return {};
    case userConstants.FORGOTPASS_FAILURE:
      return {};
    default:
      return state
  }
}