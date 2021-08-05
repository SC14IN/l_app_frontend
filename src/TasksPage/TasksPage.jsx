import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Redirect } from "react-router-dom";
import { history } from '../_helpers';
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
    handleEditUser(job){
        this.props.dispatchId(job);
        // console.log(job);
        history.push('/editTask');
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
                        <div>By status</div>
                        <div className='status'>
                            <select style={{width: "50%",backgroundColor:'#f1f1f1'}} onChange={this.selectStatus}>
                                <option >All</option>
                                {/* <option data-clm='name' >All</option> */}
                                <option data-clm='name' >In progress</option>
                                <option data-clm='email'>Completed</option>
                                <option data-clm='email'>Overdue</option>
                            </select>
                        </div>
                        <div style={{width: "1%"}}></div>
                        <div className='link'>
                            <Link to={'/createtask'} className='link' style={{float:'right'}}>Add new</Link>

                        </div>
                </div>
                <div className='flex-container'>
                        <div >Assigner</div>
                        <div>
                            <select style={{width: "50%",backgroundColor:'#f1f1f1'}} onChange={this.selectAssigner}>
                                <option >All</option>
                                {users.items && users.items.map((item) => (
                                    
                                    <option value={item.id}>{item.email}</option>
                                ))}
                            </select>
                        </div>
                        <div >Assignee</div>
                        <div>
                            <select style={{width: "50%",backgroundColor:'#f1f1f1'}} onChange={this.selectAssignee}>
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
                                <option data-clm='name' >Last 1 month</option>
                                <option data-clm='name' >Last 3 months</option>
                                <option data-clm='email'>Last 6 months</option>
                                <option data-clm='email'>Last 1 year</option>
                            </select>
                        </div>
                </div>
                    {/* {jobs.loading && <em>Loading Tasks...</em>} */}
                    <div>
                        <ul className='listing' style={{width:'40%',backgroundColor:'#f1f1f1',padding:'20px'}}>
                            {jobs.items && jobs.items.map((item) => {
                            return <li style={{outline:'auto' ,padding:'5px',borderRadius:'0'}} key={item.id}>
                                <div>
                                    <h4>{item.title}</h4>
                                    <div style={{wordWrap:'break-word'}}>-{' '}{item.description}{' '}</div>
                                    <br></br>-{item.assignerName}
                                    <br></br>Duedate:{' '}{item.duedate},{' '}{item.status}
                                    
                                </div>
                                <div className='flex-container'>
                                    <a style={{width :'23%',backgroundColor:'lightgrey',outline:'auto'}} onClick={() => this.handleEditUser(item)}>Edit</a>
                                    <a style={{width :'23%',backgroundColor:'lightgrey',outline:'auto',marginLeft:'1%'}} onClick={() => this.handleDeleteUser(item.id)}>Delete</a>
                                </div>
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
    dispatchId: userActions.editrequest,

}
const connectedPage = connect(mapState, actionCreators)(TasksPage);
export { connectedPage as TasksPage };