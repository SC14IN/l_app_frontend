import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
// import './HomePage.html';
// import SideNav from './Sidebar';

class TasksPage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        this.props.getjobs();
    }
    handleDeleteUser(id) {
        this.props.deletejob(id);
    }
    filterTD(e){
        let input = e.target.value;
        this.props.filterTD(input);
    }
    selectStatus = (e) => {
        let idx = e.target.selectedIndex;
        if (idx == 1){
            this.props.filterbystatus('all');
        }
        else if(idx==2){
            this.props.filterbystatus('inprogress');
        }
        else if(idx==3){
            this.props.filterbystatus('completed');
        }
        else{
            this.props.filterbystatus('overdue');
        }
    }
    selectAssignee = (e) => {
        this.props.filterbyassignee(e.target.value);
    }
    selectAssigner = (e) => {
        this.props.filterbyassigner(e.target.value);
    }
    
    render() {
        const { jobs,users } = this.props;

        return (
            <div>
            <div  style={{backgroundColor:'#555',height:'40px' }}>
            </div>
            <div>
                <ul className = 'navbar'>
                    <li><a href="/">Home</a></li>
                    <li><a  href='/dashboard'>Dashboard</a></li>
                    <li><a className="active" href="/tasks">Tasks</a></li>
                </ul>
            </div> 
            
            <div style={{ marginLeft:'20%' }}>
                <h2>Tasks</h2>
                <div className='flex-container'>
                        <div style={{width: "30%"}}>
                            <input onChange={e=> {
                                this.filterTD(e);
                            }} style={{width: "100%",backgroundColor:'#f1f1f1'}} placeholder='Search by Title or Description' />
                        </div>
                        <div style={{width: "5%"}}></div>
                        <div className='status'>
                            <select style={{width: "100%",backgroundColor:'#f1f1f1'}} onChange={this.selectStatus}>
                                <option >By Status</option>
                                <option data-clm='name' >All</option>
                                <option data-clm='name' >In progress</option>
                                <option data-clm='email'>Completed</option>
                                <option data-clm='email'>Overdue</option>
                            </select>
                        </div>
                        <div style={{width: "1%"}}></div>
                        <div>
                            <Link to={'/createUser'} className="btn btn-sm btn-success mb-2" style={{float:'right'}}>Add new</Link><br></br><br></br>

                        </div>
                </div>
                <div className='flex-container'>
                        <div >Assigner</div>
                        <div>
                            <select style={{width: "100%",backgroundColor:'#f1f1f1'}} onChange={this.selectAssigner}>
                                <option >All</option>
                                {users.items && users.items.map((item) => (
                                    
                                    <option value={item.id}>{item.email}</option>
                                ))}
                            </select>
                        </div>
                        <div >Assignee</div>
                        <div>
                            <select style={{width: "100%",backgroundColor:'#f1f1f1'}} onChange={this.selectAssignee}>
                                <option >All</option>
                                {users.items && users.items.map((item) => (
                                    
                                    <option value={item.id}>{item.email}</option>
                                ))}
                            </select>
                        </div>
                        <div >Interval</div>
                        <div>
                            <select style={{width: "50%",backgroundColor:'#f1f1f1'}} onChange={this.selectSort}>
                                <option >All</option>
                                <option data-clm='name' >Name A-Z</option>
                                <option data-clm='name' >Name Z-A</option>
                                <option data-clm='email'>Email A-Z</option>
                                <option data-clm='email'>Email Z-A</option>
                            </select>
                        </div>
                </div>
                    {/* {jobs.loading && <em>Loading Tasks...</em>} */}
                    <div>
                        <ul className='listing' style={{width:'40%'}}>
                            {jobs.items && jobs.items.map((item) => {
                            return <li key={item.id}>
                                <div>
                                    <h4>{item.title} </h4>.{' '}{item.description}{' '}<br></br>-{item.assignerName},
                                    {' '}{item.duedate},{' '}{item.status}
                                    
                                </div>
                                {/* {
                                    item.deleting ? <em> - Deleting...</em>
                                    : item.deleteError ? <span className="text-danger"> - ERROR: {item.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(item.id)}>Delete</a></span>
                                    } */}
                            </li>
                            })}
                        </ul>
                        
                    </div>
                    
                </div>
            </div>
        );
    }
}


function mapState(state) {
    const { jobs, authentication,users } = state;
    const { user } = authentication;
    return { user, jobs,users };
}
const actionCreators = {
    getjobs:userActions.getjobs,
    deletejob:userActions.deletejob,
    filterTD: userActions.filterbytd,
    filterbystatus: userActions.filterbystatus,
    getUsers: userActions.getAll,
    filterbyassignee: userActions.filterbyassignee,
    filterbyassigner: userActions.filterbyassigner,
}

const connectedPage = connect(mapState, actionCreators)(TasksPage);
export { connectedPage as TasksPage };