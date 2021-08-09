import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';

import { userActions } from '../_actions';
// import './HomePage.html';
import SideNav from './Sidebar';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getAll();
    }
    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
    filterById(e){
        let input = e.target.value;
        this.props.filterbyid(input);
    }
    filterByName(e){
        let input = e.target.value;
        this.props.filterbyname(input);
    }
    filterByEmail(e){
        let input = e.target.value;
        this.props.filterbyemail(input);
    }
    filterByRole(e){
        let input = e.target.value;
        this.props.filterbyrole(input);
    }
    selectSort = (e) => {
        let idx = e.target.selectedIndex;
        let dataset = e.target.options[idx].dataset;
        if (idx == 1){
            this.props.sortbyname('asc');
        }
        else if(idx==2){
            this.props.sortbyname('desc');
        }
        else if(idx==3){
            this.props.sortbyemail('asc');
        }
        else{
            this.props.sortbyemail('desc');
        }
        // can cort by id
    }
    userOverview(overviewId){
        this.props.dispatchId(overviewId);
        history.push('/overview');
    }
    render() {
        const { users } = this.props;
        
        return (
            <div>
            <div  style={{backgroundColor:'#555',height:'40px' }}>
            </div>
                {/* <SideNav name = 'sidenav'/> */}
                <ul className = 'navbar0'>
                    <li><a className="active" href="/">Home</a></li>
                    <li><a href='/dashboard'>Dashboard</a></li>
                    <li><a href="/tasks">Tasks</a></li>
                </ul>
                <section className='section' style={{marginLeft:'20%'}}><br></br>
                <Link to={'/createUser'} className="btn btn-sm btn-success mb-2">Add User</Link><br></br>
                
                <div className="control">
                   <div className="select">
                   <select onChange={this.selectSort}>
                        <option >Sort by</option>
                        <option data-clm='name' >Name A-Z</option>
                        <option data-clm='name' >Name Z-A</option>
                        <option data-clm='email'>Email A-Z</option>
                        <option data-clm='email'>Email Z-A</option>
                    </select>
                    </div>
                </div>
                                
                {/* {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>} */}
                <div>
                        
                            
                            <div className='control' style={{minWidth: "100px"}}>
                                    <input onChange={e=> {
                                        this.filterByName(e);
                                    }} style={{width: "30%"}} placeholder='Filter by Name or Email' />
                            </div>
                            
                    </div>
                <table id = 'users'>
                    
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
                                <td>
                                <a className='link-button' onClick={() => this.userOverview(user.id)}>{user.name}</a>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <button onClick={this.handleDeleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                        {user.isDeleting 
                                            ? <span className="spinner-border spinner-border-sm"></span>
                                            : <span style={{}}>Delete</span>
                                        }
                                    </button>
                                </td>
                            </tr>
                        )}
                        {/* {!users.items &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <span className="spinner-border spinner-border-lg align-center"></span>
                                </td>
                            </tr>
                        } */}
                    </tbody>
                </table>
                <p>

                    <Link to="/login">Logout</Link>
                </p>
                </section>
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
    filterbyid: userActions.filterbyid,
    filterbyname: userActions.filterbyname,
    filterbyrole: userActions.filterbyrole,
    filterbyemail: userActions.filterbyemail,
    sortbyname: userActions.sortbyname,
    sortbyemail: userActions.sortbyemail,
    dispatchId: userActions.overviewrequest,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };