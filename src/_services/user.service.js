import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    forgotpassword,
    resetpassword,
    getAll,
    getById,
    // update,
    delete: _delete,
    createuser,
    // filterbyid,
    filterbyname,
    filterbyemail,
    filterbyrole,
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    // console.log('000000 before fetch');
    return fetch('http://localhost:8050/api/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('http://localhost:8050/api/register', requestOptions).then(handleResponse);
}
function resetpassword(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('http://localhost:8050/api/resetPassword', requestOptions).then(handleResponse);
}
function forgotpassword(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('http://localhost:8050/api/forgotPassword', requestOptions).then(handleResponse);
}
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/listUsers', requestOptions).then(handleResponse);
}
// function filterbyid(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch('http://localhost:8050/api/filter?column=id&string='+id, requestOptions).then(handleResponse);
// }
function filterbyname(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filter?column=name&string='+name, requestOptions).then(handleResponse);
}
function filterbyemail(email) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filter?column=email&string='+email, requestOptions).then(handleResponse);
}
function filterbyrole(role) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filter?column=role&string='+role, requestOptions).then(handleResponse);
}
function getById(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filter?column=id&string='+id, requestOptions).then(handleResponse);
}

function createuser(user) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(user)
    };
    
    return fetch('http://localhost:8050/api/createUser', requestOptions).then(handleResponse);
}
// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch('http://localhost:8050/api/filter', requestOptions).then(handleResponse);
// }

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    // console.log('00000')

    return fetch('http://localhost:8050/api/delUser?id='+id, requestOptions).then(handleResponse);
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}