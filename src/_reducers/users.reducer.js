import { userConstants } from '../_constants';
export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      // console.log(action.id);
      
      const ans = {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      }
      // console.log(ans);
      return ans;
    case userConstants.DELETE_SUCCESS:
      // console.log(state.items.filter(user => user.id !== action.id));
      // remove deleted user from state
      // const userList = state.items[0];
      // console.log(userList);
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
    case userConstants.FILTER_BY_VALUE:
      //the value passed from our presentational component
      let value = action.value;
      let filteredValues = state.items[0].filter(user => {
        //return any product whose name or designer contains the input box string
        return user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value);
      });
      console.log(filteredValues);
      
      return {
        ...state,
        // items: filteredValues,
    };
   
    default:
      return state
  }
}