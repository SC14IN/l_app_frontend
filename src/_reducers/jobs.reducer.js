import { userConstants } from '../_constants';
export function jobs(state = {}, action) {
    switch (action.type) {
        case userConstants.GETJOBS_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETJOBS_SUCCESS:
            return {
                items: action.jobs
            };
        case userConstants.GETJOBS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state

        case userConstants.DELETEJOB_REQUEST:
            const ans = {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                    ? { ...user, deleting: true }
                    : user
                )
            }
            return ans;
        case userConstants.DELETEJOB_SUCCESS:
            return {
                items: state.items.filter(user => user.id !== action.id),
            };
        // case userConstants.DELETE_FAILURE:
        //   // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        //   return {
        //     ...state,
        //     items: state.items.map(user => {
        //       if (user.id === action.id) {
        //         // make copy of user without 'deleting:true' property
        //         const { deleting, ...userCopy } = user;
        //         // return copy of user with 'deleteError:[error]' property
        //         return { ...userCopy, deleteError: action.error };
        //       }

        //       return user;
            // })
        // };
    }

}