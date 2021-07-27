import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import SideNav from './Sidebar';
class HomePage extends React.Component {
    //delete not updating used reload
    //create user error aithentication ]
    //add sort and filter (same problem for delete , inbuilt filter not working)
    componentDidMount() {
        this.props.getAll();
    }

    handleDeleteUser(id) {
        // const { deleting } = this.props;
        return (e) => this.props.deleteUser(id);
    }
    filterByInput(e){
        let input = e.target.value;
        // console.log('a');
        this.props.filterByValue({value: input});
    }
    
    render() {
        const { users } = this.props;
        return (
            
            // <div className="col-md-6 col-md-offset-3">
            //     <h1>Hi!</h1>
            //     <h3>All users:</h3>
            //     <Link to={'/createUser'} className="btn btn-sm btn mb-2">Add User</Link>
            //     {users.loading && <em>Loading users...</em>}
            //     {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            //     {users.items &&
            //         <ul> 
            //         {users.items[0].map((user) =>
            //                 <li key={user.id}>
            //                     {user.id}<br></br>
            //                     {user.name}<br></br>
            //                     {user.email}<br></br>
            //                     {
            //                         user.deleting ? <em> - Deleting...</em>
            //                         : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
            //                         : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
            //                     }
            //                 </li>
            //             )}
            //         </ul>
            //     }
            //     <p>
            //         <Link to="/login">Logout</Link>
            //     </p>
            // </div>
            <div>
                <SideNav name = 'sidenav'/>
                {/* <componentName name='sidenav'/> */}
                {/* <h1>Hi!</h1> */}
                {/* <h3>All users:</h3>  */}
                <Link to={'/createUser'} className="btn btn-sm btn-success mb-2">Add User</Link>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                <div className='control' style={{minWidth: "300px"}}>
                    <input onChange={e=> {
                        //call this method on every change in input
                        this.filterByInput(e);
                    }} style={{width: "50%"}} placeholder='Filter by' type='text'/>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '23%' }}>Id</th>
                            <th style={{ width: '23%' }}>Name</th>
                            <th style={{ width: '23%' }}>Email</th>
                            <th style={{ width: '23%' }}>Role</th>
                            <th style={{ width: '8%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.items && users.items[0].map(user =>
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={'/register'} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                    <button onClick={this.handleDeleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                        {user.isDeleting 
                                            ? <span className="spinner-border spinner-border-sm"></span>
                                            : <span>Delete</span>
                                        }
                                    </button>
                                </td>
                            </tr>
                        )}
                        {!users.items &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <span className="spinner-border spinner-border-lg align-center"></span>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getAll: userActions.getAll,
    deleteUser: userActions.delete,
    createUser: userActions.createuser,
    filterByValue: userActions.filterbyvalue,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };