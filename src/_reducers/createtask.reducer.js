import { userConstants } from "../_constants";

export function createtask(state = {}, action) {
  switch (action.type) {
    case userConstants.CREATETASK_REQUEST:
      return { ...state, create: true };
    case userConstants.CREATETASK_SUCCESS:
      return { ...state, create:false };
    case userConstants.CREATETASK_FAILURE:
      return { state };

    case userConstants.EDITTASK_REQUEST:
      return { ...state, edit: true };
    case userConstants.EDITTASK_SUCCESS:
      return { ...state,edit:false };
    case userConstants.EDITTASK_FAILURE:
      return { state };

    default:
      return state;
  }
}
