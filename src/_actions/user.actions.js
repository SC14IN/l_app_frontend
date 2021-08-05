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
    filterbyid,
    filterbyname,
    filterbyemail,
    filterbyrole,
    getjobs,
    deletejob,
    getbyid,
    sortbyname,
    sortbyemail,
    filterbytd,
    filterbystatus,
    filterbyassignee,
    filterbyassigner,
    createtask,
    editrequest,
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
function filterbyid(id) {
    return dispatch => {
        dispatch(request());
        userService.filterbyid(id)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.FILTERBYID_REQUEST,id } }
    function success(users) { return { type: userConstants.FILTERBYID_SUCCESS, users } }
    function failure(error) { return { type: userConstants.FILTERBYID_FAILURE, error } }
}
function filterbyrole(role) {
    return dispatch => {
        dispatch(request());
        userService.filterbyrole(role)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.FILTERBYROLE_REQUEST,role } }
    function success(users) { return { type: userConstants.FILTERBYROLE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.FILTERBYROLE_FAILURE, error } }
}
function filterbyname(name) {
    return dispatch => {
        dispatch(request());
        userService.filterbyname(name)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.FILTERBYNAME_REQUEST , name} }
    function success(users) { return { type: userConstants.FILTERBYNAME_SUCCESS, users } }
    function failure(error) { return { type: userConstants.FILTERBYNAME_FAILURE, error } }
}
function filterbyemail(email) {
    return dispatch => {
        dispatch(request());
        userService.filterbyemail(email)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.FILTERBYEMAIL_REQUEST ,email} }
    function success(users) { return { type: userConstants.FILTERBYEMAIL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.FILTERBYEMAIL_FAILURE, error } }
}
function getjobs() {
    return dispatch => {
        dispatch(request());
        userService.getjobs()
            .then(
                jobs => dispatch(success(jobs)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETJOBS_REQUEST } }
    function success(jobs) { return { type: userConstants.GETJOBS_SUCCESS, jobs } }
    function failure(error) { return { type: userConstants.GETJOBS_FAILURE, error } }
}
function deletejob(id) {
    return dispatch => {
        dispatch(request(id));

        userService.deletejob(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETEJOB_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETEJOB_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETEJOB_FAILURE, id, error } }
}
function getbyid(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getbyid(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.GETBYID_REQUEST, id } }
    function success(id) { return { type: userConstants.GETBYID_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.GETBYID_FAILURE, id, error } }
}
function sortbyname(direction) {
    return dispatch => {
        dispatch(request(direction));
    };

    function request(direction) { return { type: userConstants.SORT_BY_NAME, direction } }
}
function sortbyemail(direction) {
    return dispatch => {
        dispatch(request(direction));
    };

    function request(direction) { return { type: userConstants.SORT_BY_EMAIL, direction } }
}
function filterbytd(string) {
    return dispatch => {
        dispatch(request());
        userService.filterbytd(string)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.FILTERBYTD_REQUEST , string} }
    function success(users) { return { type: userConstants.FILTERBYTD_SUCCESS, users } }
    function failure(error) { return { type: userConstants.FILTERBYTD_FAILURE, error } }
}
function filterbystatus(name) {
    return dispatch => {
        dispatch(request());
        userService.filterbystatus(name)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.FILTERBYSTATUS_REQUEST , name} }
    function success(users) { return { type: userConstants.FILTERBYSTATUS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.FILTERBYSTATUS_FAILURE, error } }
}
function filterbyassignee(id) {
    return dispatch => {
        dispatch(request());
        userService.filterbyassignee(id)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.FILTERBYASSIGNEE_REQUEST , id} }
    function success(users) { return { type: userConstants.FILTERBYASSIGNEE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.FILTERBYASSIGNEE_FAILURE, error } }
}
function filterbyassigner(id) {
    return dispatch => {
        dispatch(request());
        userService.filterbyassigner(id)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.FILTERBYASSIGNER_REQUEST , id} }
    function success(users) { return { type: userConstants.FILTERBYASSIGNER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.FILTERBYASSIGNER_FAILURE, error } }
}
function createtask(user) {
    return dispatch => {
        dispatch(request(user));

        userService.createtask(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/tasks');
                    dispatch(alertActions.success('Task created!'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.CREATETASK_REQUEST, user } }
    function success(user) { return { type: userConstants.CREATETASK_SUCCESS } }
    function failure(error) { return { type: userConstants.CREATETASK_FAILURE, error } }
}
function editrequest(job) {
    return dispatch => {
        dispatch(request(job));
    };
    function request(job) { return { type: userConstants.EDIT_REQUEST, job } }
    
}
