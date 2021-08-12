import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { userActions } from '../_actions';
// import SideNav from './Sidebar';
import './styles.scss';

import Highcharts from "highcharts/highstock";
import variablePie from "highcharts/modules/variable-pie.js";
//import HighchartsReact from "./HighchartsReact.js";
import HighchartsReact from "highcharts-react-official";

variablePie(Highcharts);

  
class TasksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                string:'',
                status:'',
                assigner:'',
                assignee:'',
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectAssignee = this.selectAssignee.bind(this);
        this.selectAssigner = this.selectAssigner.bind(this);
        this.selectStatus = this.selectStatus.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
        this.props.getjobs();
        this.props.getValues();
        // this.props.getValuesByMonth();
    }
    handleDeleteUser(id) {
        this.props.deletejob(id);
    }
    handleEditUser(job){
        this.props.dispatchId(job);
        // console.log(job);
        history.push('/editTask');
    }
    updateStatus = (e) =>{
        let idx = e.target.selectedIndex;
        let dataset = e.target.options[idx].dataset;
        if (idx == 1){
            this.props.updatestatus('inprogress',dataset.id);
        }
        else if(idx==2){
            this.props.updatestatus('completed',dataset.id);
        }
    }
    filterTD(e){
        let input = e.target.value;
        const { filter } = this.state;
        this.setState({
            filter:{
                ...filter,
                 string:input
                }
        });
    }
    selectStatus(e){
        const { filter } = this.state;
        this.setState({
            filter:{
                ...filter,
                 status:e.target.value
                }
        });
    }
    selectAssignee(e){
        const { filter } = this.state;
        this.setState({
            filter:{
                ...filter,
                 assignee:e.target.value
                }
        });
    }
    selectAssigner(e){
        const { filter } = this.state;
        this.setState({
            filter:{
                ...filter,
                assigner:e.target.value
                }
        });
    }
    
    handleSubmit() {
        // console.log(1);
        const { filter } = this.state;
        console.log(filter);
        this.props.filtertasks({...filter});
    }
    render( ) {
        const { jobs,users } = this.props;
        const{user} = this.props;
        return (
            <div>
                <div  className='top-header' >
                </div>
                <div>
                    <ul className = 'navbar0'>
                        <li><a href="/">Users</a></li>
                        <li><a  href='/dashboard'>Dashboard</a></li>
                        <li><a className="active" href="/tasks">Tasks</a></li>
                    </ul>
                </div> 
                
                <div className='big-container' style={{ marginLeft:'20%' }}>
                    
                        <ul className='flex-container' style={{listStyleType:'none'}}>
                            <li><a className="active"href="/tasks">List</a></li>
                            <li><a  href='/overview'>Overview</a></li>
                            <li><a  href="/tasks">Archived</a></li>
                        </ul>
                    <div className='flex-container'>
                    <h2>Tasks</h2>
                    <div className='link-1' style={{flexGrow:'8'}}>
                                <Link to={'/createtask'} className='link' style={{float:'right'}}>Add new</Link>

                            </div>
                            </div>
                    <div className='flex-container-fixed'>
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
                                    <option  >Inprogress</option>
                                    <option >CompletedOnTime</option>
                                    <option >CompletedAfterDeadline</option>
                                    <option >Overdue</option>
                                </select>
                            </div>
                            <div style={{width: "1%"}}></div>
                            
                    </div><br></br>
                    <div className='flex-container'>
                            <div >Assigner</div>
                            <div>
                                <select style={{width: "50%",backgroundColor:'#f1f1f1'}} onChange={this.selectAssigner}>
                                    <option >All</option>
                                    {users.items && users.items.map((item) => (
                                        
                                        <option value={item.id} key={item.id}>{item.email}</option>
                                    ))}
                                </select>
                            </div>
                            <div >Assignee</div>
                            <div>
                                <select style={{width: "50%",backgroundColor:'#f1f1f1'}} onChange={this.selectAssignee}>
                                    <option >All</option>
                                    {users.items && users.items.map((item) => (
                                        
                                        <option value={item.id} key={item.id}>{item.email}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{flexGrow:'8'}}>
                                <a className='normal-button' style={{float:'right'}} onClick={() => this.handleSubmit()}>Apply filters</a>
                            </div>
                            {/* <div >Interval</div>
                            <div>
                                <select style={{width: "50%",backgroundColor:'#f1f1f1'}} onChange={this.selectSort}>
                                    <option >All</option>
                                    <option data-clm='name' >Last 1 month</option>
                                    <option data-clm='name' >Last 3 months</option>
                                    <option data-clm='email'>Last 6 months</option>
                                    <option data-clm='email'>Last 1 year</option>
                                </select>
                            </div> */}
                    </div>
                </div>

                        <div>
                        
                            <ul className='listing' style={{width:'50%',backgroundColor:'#f1f1f1',padding:'20px'}}>
                                {jobs.items && jobs.items.map((item) => {
                                return <li style={{padding:'5px',borderRadius:'0'}} key={item.id}>
                                    <div>
                                    <h4>{item.title}</h4>
                                    <div style={{ wordWrap: "break-word" }}>
                                    - {item.description}{" "}
                                    </div>
                                    <br></br>Assigner:{' '}{item.assignerName}
                                    <br></br>Assignee: {' '}{item.assigneeName}
                                    <br></br>Status: {' '}{item.status}
                                    <br></br>Duedate: {' '}{item.duedate}
                                    </div>
                                    {user.id==item.assignee ?
                                    (<div  style={{padding:'4px 4px 4px 0'}}>
                                        Update status:{' '}
                                        <select style={{width: "35%",backgroundColor:'#f1f1f1'}} onChange={this.updateStatus}>
                                            <option >{item.status}</option>
                                            <option data-id = {item.id}>In Progress</option>
                                            <option data-id = {item.id}>Completed</option>
                                        </select>
                                    </div>)
                                    :
                                    (<div  style={{padding:'4px 4px 4px 0'}}>
                                    </div>)}
                                    {user.id==item.creator ?
                                    (<div className='flex-container'>
                                        <a className='normal-button' onClick={() => this.handleEditUser(item)}>Edit</a>
                                        <a className='normal-button' onClick={() => this.handleDeleteUser(item.id)}>Delete</a>
                                    </div>)
                                    : null}
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
        // console.log(values);

    return { user, jobs,users };
}
const actionCreators = {
    getjobs:userActions.getjobs,
    deletejob:userActions.deletejob,
    filtertasks: userActions.filtertasks,
    filterbystatus: userActions.filterbystatus,
    getUsers: userActions.getAll,
    filterbyassignee: userActions.filterbyassignee,
    filterbyassigner: userActions.filterbyassigner,
    dispatchId: userActions.editrequest,
    getValues: userActions.getvalues,
    updatestatus: userActions.updatestatus,
    getValuesByMonth: userActions.getvaluesbymonth,

}
const connectedPage = connect(mapState, actionCreators)(TasksPage);
export { connectedPage as TasksPage };