import { userConstants } from "../_constants";

export function jobs(state = {}, action) {
    switch (action.type) {
        case userConstants.GETJOBS_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case userConstants.GETJOBS_SUCCESS:
        return {
            ...state,
            loading:false,
            items: action.jobs,
        };
        case userConstants.GETJOBS_FAILURE:
        return {
            ...state,
            error: action.error,
        };

        case userConstants.DELETEJOB_REQUEST:
        const ans = {
            ...state,
            items: state.items.map((user) =>
            user.id === action.id ? { ...user, deleting: true } : user
            ),
        };
        return ans;
        case userConstants.DELETEJOB_SUCCESS:
            // console.log(state.items.filter((user) => user.id !== action.id));
        return {
            ...state,
            items: state.items.filter((user) => user.id != action.id),
        };
        // case userConstants.DELETE_FAILURE:
        case userConstants.FILTERBYTD_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case userConstants.FILTERBYTD_SUCCESS:
        return {
            ...state,loading:false,
            items: action.jobs,
        };
        case userConstants.FILTERBYTD_FAILURE:
        return {
            ...state,
            error: action.error,
        };

        case userConstants.FILTERBYSTATUS_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case userConstants.FILTERBYSTATUS_SUCCESS:
        return {
            ...state,
            items: action.users,
        };
        case userConstants.FILTERBYSTATUS_FAILURE:
        return {
            ...state,
            error: action.error,
        };
        
        case userConstants.FILTERBYASSIGNEE_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case userConstants.FILTERBYASSIGNEE_SUCCESS:
        return {
            ...state,
            items: action.users,
        };
        case userConstants.FILTERBYASSIGNEE_FAILURE:
        return {
            ...state,
            error: action.error,
        };
        
        case userConstants.FILTERBYASSIGNER_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case userConstants.FILTERBYASSIGNER_SUCCESS:
        return {
            ...state,
            items: action.users,
        };
        case userConstants.FILTERBYASSIGNER_FAILURE:
        return {
            ...state,
            error: action.error,
        };

        case userConstants.GETVALUES_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case userConstants.GETVALUES_SUCCESS:
        return {
            ...state,loading:false,
            values: action.values,
        };
        case userConstants.GETVALUES_FAILURE:
        return {
            ...state,
            error: action.error,
        };

        case userConstants.GETVALUESM_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case userConstants.GETVALUESM_SUCCESS:
        return {
            ...state,loading:false,
            monthlyValues: action.valuesM,
        };
        case userConstants.GETVALUESM_FAILURE:
        return {
            ...state,
            error: action.error,
        };

        default:
        return state;
    }
}
