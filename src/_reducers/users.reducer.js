import { userConstants } from "../_constants";
function sortAsc(arr, field) {
	return arr.sort(function (a, b) {
		if (a[field] > b[field]) {
		return 1;
		}
		if (b[field] > a[field]) {
		return -1;
		}
		return 0;
	});
}
function sortDesc(arr, field) {
	return arr.sort(function (a, b) {
		if (a[field] > b[field]) {
			return -1;
		}
		if (b[field] > a[field]) {
			return 1;
		}
		return 0;
	});
}
export function users(state = {}, action) {
	switch (action.type) {
		case userConstants.GETALL_REQUEST:
			return {
				...state,
				loading: true,
			};
		case userConstants.GETALL_SUCCESS:
			return {
				...state,
				items: action.users,
			};
		case userConstants.GETALL_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case userConstants.DELETE_REQUEST:
			// add 'deleting:true' property to user being deleted
			// console.log(action.id);

			const ans = {
				...state,
				items: state.items.map((user) =>
				user.id === action.id ? { ...user, deleting: true } : user
				),
			};
			// console.log(ans);
			return ans;
		case userConstants.DELETE_SUCCESS:
			// console.log(state.items.filter(user => user.id !== action.id));
			// remove deleted user from state
			// const userList = state.items;
			console.log(state.items.filter((user) => user.id !== action.id));
			return {
				...state,
				items: state.items.filter((user) => user.id !== action.id),
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
			// //the value passed from our presentational component
			let value = action.value.value.toLowerCase();

			let filteredValues = state.items.filter((user) => {
				//return any product whose name or designer contains the input box string
				return (
				user.name.toLowerCase().includes(value) ||
				user.email.toLowerCase().includes(value) ||
				user.role.toLowerCase().includes(value)
				);
			});
			let rest = state.items.filter((user) => {
				//return any product whose name or designer contains the input box string
				return !(
				user.name.toLowerCase().includes(value) ||
				user.email.toLowerCase().includes(value) ||
				user.role.toLowerCase().includes(value)
				);
			});
			// console.log('filtervalues',filteredValues);

			// console.log('values',value);

			// console.log('state.items',state.items);

			return {
				...state,
				items: filteredValues.concat(rest),
			};
		case userConstants.FILTERBYNAME_REQUEST:
			return {
				...state,
				loading: true,
			};
		case userConstants.FILTERBYNAME_SUCCESS:
			return {
				...state,
				items: action.users,
			};
		case userConstants.FILTERBYNAME_FAILURE:
			return {
				...state,
				error: action.error,
			};

		case userConstants.FILTERBYEMAIL_REQUEST:
			return {
				...state,
				loading: true,
			};
		case userConstants.FILTERBYEMAIL_SUCCESS:
			return {
				...state,
				items: action.users,
			};
		case userConstants.FILTERBYEMAIL_FAILURE:
			return {
				...state,
				error: action.error,
			};

		case userConstants.FILTERBYROLE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case userConstants.FILTERBYROLE_SUCCESS:
			return {
				...state,
				items: action.users,
			};
		case userConstants.FILTERBYROLE_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case userConstants.SORT_BY_NAME:
			let sortedArr =
				action.direction === "asc"
				? sortAsc(state.items, "name")
				: sortDesc(state.items, "name");

			return {
				...state,
				items: sortedArr,
			};
		case userConstants.SORT_BY_EMAIL:
			let sortedArrr =
				action.direction === "asc"
				? sortAsc(state.items, "email")
				: sortDesc(state.items, "email");

			return {
				...state,
				items: sortedArrr,
			};
		default:
			return state;
	}
}
