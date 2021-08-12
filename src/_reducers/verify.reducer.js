import { userConstants } from '../_constants';

export function verify(state = {}, action) {
  switch (action.type) {
    case userConstants.VERIFY_REQUEST:
      return { verifying: true };
    case userConstants.VERIFY_SUCCESS:
      return {verifying: false};
    case userConstants.VERIFY_FAILURE:
      return {};
    default:
      return state
  }
}