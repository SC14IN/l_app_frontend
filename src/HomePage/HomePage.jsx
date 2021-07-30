import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import SideNav from './Sidebar';
class HomePage extends React.Component {
    //create user error aithentication 
    componentDidMount() {
        this.props.getAll();
    }

    handleDeleteUser(id) {
        // const { deleting } = this.props;
        return (e) => this.props.deleteUser(id);
    }

    // filterById(e){
    //     let input = e.target.value;
    //     // console.log('a');
    //     this.props.filterbyid(input);
    // }
    filterByName(e){
        let input = e.target.value;
        // console.log('a');
        this.props.filterbyname(input);
    }
    filterByEmail(e){
        let input = e.target.value;
        // console.log('a');
        this.props.filterbyemail(input);
    }
    filterByRole(e){
        let input = e.target.value;
        // console.log('a');
        this.props.filterbyrole(input);
    }
    
    render() {
        const { users } = this.props;
        
        return (
            <div>
            {/* flexbox */}
                <SideNav name = 'sidenav'/>

                <Link to={'/createUser'} className="btn btn-sm btn-success mb-2">Add User</Link><br></br><br></br>
                
                        <div className="control">
                           <div className="select">
                                <select>
                                   <option value="" disabled selected>Sort by</option>
                                   <option>Name - A-Z</option>
                                    <option>Name - Z-A</option>
                                </select>
                           </div>
                       </div><br></br>
                                    
                <div>Filter By
                </div>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                {/* <div className='control' style={{minWidth: "100px"}}>
                                    <input onChange={e=> {
                                    //call this method on every change in input
                                        this.filterById(e);
                                    }} style={{width: "100%"}} placeholder='Id' type='text'/>
                                </div> */}
                                
                            </th>
                            <th>
                                <div className='control' style={{minWidth: "100px"}}>
                                    <input onChange={e=> {
                                    //call this method on every change in input
                                        this.filterByName(e);
                                    }} style={{width: "100%"}} placeholder='Name' type='text'/>
                                </div>
                                
                            </th>
                            <th>
                                <div className='control' style={{minWidth: "100px"}}>
                                    <input onChange={e=> {
                                    //call this method on every change in input
                                        this.filterByEmail(e);
                                    }} style={{width: "100%"}} placeholder='Email' type='text'/>
                                </div>
                            </th>
                            <th>
                                {/* <div className='control' style={{minWidth: "100px"}}>
                                    <input onChange={e=> {
                                    //call this method on every change in input
                                        this.filterByRole(e);
                                    }} style={{width: "100%"}} placeholder='Role' type='text'/>
                                </div> */}
                            </th>
                        </tr>
                    </thead>
                {/* </table> */}
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
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
                
                        {users.items && users.items.map(user =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
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
    filterbyname: userActions.filterbyname,
    filterbyrole: userActions.filterbyrole,
    filterbyemail: userActions.filterbyemail,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };