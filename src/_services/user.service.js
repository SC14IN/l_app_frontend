import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    forgotpassword,
    resetpassword,
    getAll,
    getbyid,
    // update,
    delete: _delete,
    createuser,
    filterbyid,
    filterbyname,
    filterbyemail,
    filterbyrole,
    getjobs,
    deletejob,
    filterbytd,
    filterbystatus,
    filterbyassigner,
    filterbyassignee,
    createtask,
    getvalues,
    updatestatus,
    getvaluesbymonth,
    
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
function getjobs() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/viewJobs', requestOptions).then(handleResponse);
}
function getvalues(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/getValues?id=', requestOptions).then(handleResponse);
}
function getvaluesbymonth() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/getMonthlyValues', requestOptions).then(handleResponse);
}
function filterbyid(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filter?column=id&string='+id, requestOptions).then(handleResponse);
}
function filterbyname(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filter?string='+name, requestOptions).then(handleResponse);
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
function getbyid(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filter?column=id&string='+id, requestOptions).then(handleResponse);
}
// function createuser(user) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader(),
        
//     };
    
//     return fetch('http://localhost:8050/api/createUser?name='+user.name+'&email='+user.email, requestOptions).then(handleResponse);
// }
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    // console.log('00000')

    return fetch('http://localhost:8050/api/delUser?id='+id, requestOptions).then(handleResponse);
}
function deletejob(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    // console.log('00000')

    return fetch('http://localhost:8050/api/deleteJob?id='+id, requestOptions).then(handleResponse);
}
function filterbytd(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filterJobs?column=title&string='+name, requestOptions).then(handleResponse);
}
function filterbystatus(name) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filterJobs?column=status&string='+name, requestOptions).then(handleResponse);
}
function filterbyassigner(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filterJobs?column=assigner&string='+id, requestOptions).then(handleResponse);
}
function filterbyassignee(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8050/api/filterJobs?column=assignee&string='+id, requestOptions).then(handleResponse);
}


// const axios = require('axios');
import axios from 'axios';

// axios.defaults.baseURL = "http://localhost:8050";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// function createuser(user) {
//     // Send a POST request
//     return axios.post('http://localhost:8050/api/createUser', user, { authHeader });
// }
function createuser(user) {
    const u = JSON.parse(localStorage.getItem('user'));
    const token = u.token;
    const postData = {name: user.name, email: user.email};
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.post('http://localhost:8050/api/createUser',postData,config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
}
function createtask(user) {
    const u = JSON.parse(localStorage.getItem('user'));
    const token = u.token;
    const postData = user;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.post('http://localhost:8050/api/createJob',postData,config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
}
function updatestatus(status,id) {
    const u = JSON.parse(localStorage.getItem('user'));
    const token = u.token;
    const postData = {'status':status,'id':id};
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.put('http://localhost:8050/api/updateStatus',postData,config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
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