import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

// import SideNav from './Sidebar';
class DashboardPage extends React.Component {
    //create user error aithentication 
    componentDidMount() {
        this.props.getjobs();
    }

    handleDeleteUser(id) {
        this.props.deletejob(id);
    }
    render() {
        const { jobs } = this.props;
        
        return (
            <div> 
                <section className='section'>
                    <Link to={'/createUser'} className="btn btn-sm btn-success mb-2">Add Job</Link><br></br><br></br>
                    <div className='container'>
                        <div className="field is-grouped" style={{alignItems: "center"}}>
                            <div className='control' style={{minWidth: "300px"}}>
                                <input onChange={e=> {
                                    //call this method on every change in input
                                    this.filterByInput(e);
                                }} style={{width: "33%"}} placeholder='Assigner' type='text'/>
                            </div>
                            <div className='control' style={{minWidth: "300px"}}>
                                <input onChange={e=> {
                                    //call this method on every change in input
                                    this.filterByInput(e);
                                }} style={{width: "33%"}} placeholder='Assignee' type='text'/>
                            </div>
                        </div>
                    </div>

                    {jobs.loading && <em>Loading users...</em>}
                    {jobs.error && <span className="text-danger">ERROR: {jobs.error}</span>}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th style={{ width: '23%' }}>Due date</th>
                                <th style={{ width: '23%' }}>Title</th>
                                <th style={{ width: '23%' }}>Description</th>
                                <th style={{ width: '23%' }}>status</th>
                                <th style={{ width: '8%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                    
                            {jobs.items && jobs.items.map(user =>
                                <tr key={user.id}>
                                    <td>{user.duedate}</td>
                                    <td>{user.title}</td>
                                    <td>{user.description}</td>
                                    <td>{user.status}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        {/* <Link to={'/register'} className="btn btn-sm btn-primary mr-1">Edit</Link> */}
                                        <button onClick={()=>{this.handleDeleteUser(user.id)} }className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                            {user.isDeleting 
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : <span>Delete</span>
                                            }
                                        </button>
                                    </td>
                                </tr>
                            )}
                            {!jobs.items &&
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <span className="spinner-border spinner-border-lg align-center"></span>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}

function mapState(state) {
    const { jobs, authentication } = state;
    const { user } = authentication;
    return { user, jobs };
}

const actionCreators = {
    getjobs:userActions.getjobs,
    deletejob:userActions.deletejob
}

const connectedPage = connect(mapState, actionCreators)(DashboardPage);
export { connectedPage as DashboardPage };