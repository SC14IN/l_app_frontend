import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    forgotpassword,
    resetpassword,
    getAll,
    delete: _delete,
    createuser,
    filterbyvalue,
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function forgotpassword(user) {
    return dispatch => {
        dispatch(request(user));

        userService.forgotpassword(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/resetpassword');//reset password
                    dispatch(alertActions.success('Token sent to email'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.FORGOTPASS_REQUEST, user } }
    function success(user) { return { type: userConstants.FORGOTPASS_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FORGOTPASS_FAILURE, error } }
}
function resetpassword(user) {
    return dispatch => {
        dispatch(request(user));

        userService.resetpassword(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Reset successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.RESET_REQUEST, user } }
    function success(user) { return { type: userConstants.RESET_SUCCESS, user } }
    function failure(error) { return { type: userConstants.RESET_FAILURE, error } }
}
function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                    // location.reload();
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
function createuser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.createuser(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Token sent to email'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.CREATEUSER_REQUEST, user } }
    function success(user) { return { type: userConstants.CREATEUSER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CREATEUSER_FAILURE, error } }
}
function filterbyvalue(value) {
    return dispatch => {
        dispatch(request(value));
    }
    function request() { return { type: userConstants.FILTER_BY_VALUE,value } }
}