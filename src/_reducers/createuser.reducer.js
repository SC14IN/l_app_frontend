import { userConstants } from '../_constants';

export function createuser(state = {}, action) {
  switch (action.type) {
    case userConstants.CREATEUSER_REQUEST:
      return { create: true };
    case userConstants.CREATEUSER_SUCCESS:
      return {};
    case userConstants.CREATEUSER_FAILURE:
      return {};
    default:
      return state
  }
}