import { alertConstants, userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { toast } from 'react-toastify';
//check error 
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
    filterbystatus,
    filterbyassignee,
    filterbyassigner,
    createtask,
    editrequest,
    getvalues,
    updatestatus,
    getvaluesbymonth,
    getuser,
    verifyuser,
    deleteself,
    filtertasks,
    edittask,
    alertclear,

};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        dispatch({type:alertConstants.CLEAR});
        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {

                    dispatch(failure(error.toString()));
                    toast.error(error.toString(), {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
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
    history.push('/login');
    return { type: userConstants.LOGOUT };
}
function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/verify');
                    toast.success('Registration successful', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    // dispatch(alertActions.success('Registration successful'));
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
function verifyuser(user) {
    return dispatch => {
        dispatch(request(user));
        userService.verifyuser(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    toast.success('Verification successful', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
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
                    history.push('/resetpassword');
                    toast.success('Token sent to mail', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
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
function deleteself() {
    return dispatch => {
        dispatch(request());

        userService.deleteself()
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                },
                error => dispatch(failure( error.toString()))
            );
    };

    function request() { return { type: userConstants.DELETESELF_REQUEST } }
    function success() { return { type: userConstants.DELETESLEF_SUCCESS } }
    function failure( error) { return { type: userConstants.DELETESELF_FAILURE, error } }
}
function resetpassword(user) {
    return dispatch => {
        dispatch(request(user));

        userService.resetpassword(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    toast.success('Reset password successful', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
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
                    toast.warn('User deleted', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
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
                    dispatch(success(user));
                    history.push('/');
                    // dispatch(alertActions.success('Token sent to email'));
                    toast.success('User created!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                },
                error => {
                    // console.log(error);
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
                    toast.warn('Task deleted', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                },
                
            ).catch(
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
function filtertasks(filter) {
    return dispatch => {
        dispatch(request(filter));
        userService.filtertasks(filter)
            .then(
                jobs => dispatch(success(jobs)),
                error => dispatch(failure(error.toString()))
            );
    };
    
    function request(filter) { return { type: userConstants.FILTERBYTD_REQUEST , filter} }
    function success(jobs) { return { type: userConstants.FILTERBYTD_SUCCESS, jobs } }
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
                    toast.success('Task created!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
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
function edittask(user) {
    return dispatch => {
        dispatch(request(user));

        userService.edittask(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/tasks');
                    dispatch(alertActions.success('Task updated!'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.EDITTASK_REQUEST, user } }
    function success() { return { type: userConstants.EDITTASK_SUCCESS } }
    function failure(error) { return { type: userConstants.EDITTASK_FAILURE, error } }
}
function editrequest(job) {
    return dispatch => {
        dispatch(request(job));
    };
    function request(job) { return { type: userConstants.EDIT_REQUEST, job } }
    
}
function overviewrequest(id) {
    return dispatch => {
        dispatch(request(id));
    };
    function request(id) { return { type: userConstants.OVERVIEW_REQUEST, id } }
    
}
function getvalues(id) {
    return dispatch => {
        dispatch(request());
        userService.getvalues(id)
            .then(
                values => dispatch(success(values)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETVALUES_REQUEST } }
    function success(values) { return { type: userConstants.GETVALUES_SUCCESS, values } }
    function failure(error) { return { type: userConstants.GETVALUES_FAILURE, error } }
}
function updatestatus(status,id) {
    return dispatch => {
        dispatch(request(status,id));

        userService.updatestatus(status,id)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(alertActions.success('Status updated'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(status,id) { return { type: userConstants.UPDATESTATUS_REQUEST, status,id } }
    function success(status) { return { type: userConstants.UPDATESTATUS_SUCCESS } }
    function failure(error) { return { type: userConstants.UPDATESTATUS_FAILURE, error } }
}
function getvaluesbymonth(id) {
    return dispatch => {
        dispatch(request());
        userService.getvaluesbymonth(id)
            .then(
                valuesM => dispatch(success(valuesM)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETVALUESM_REQUEST } }
    function success(valuesM) { return { type: userConstants.GETVALUESM_SUCCESS, valuesM } }
    function failure(error) { return { type: userConstants.GETVALUESM_FAILURE, error } }
}
function getuser() {
    return dispatch => {
        dispatch(request());
        userService.getuser()
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETUSER_REQUEST } }
    function success(user) { return { type: userConstants.GETUSER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETUSER_FAILURE, error } }
}
function alertclear() {
    return dispatch => {
        dispatch(request());
    };
    function request() { return { type: alertConstants.CLEAR } }
    
}