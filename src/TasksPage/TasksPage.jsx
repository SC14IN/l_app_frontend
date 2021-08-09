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
    // selectOptions = (e) =>{
    //     let idx = e.target.selectedIndex;
    //     let dataset = e.target.options[idx].dataset.clm;
    //     if (idx == 1){
    //         this.props.filterbystatus('all');
    //     }
    //     else if(idx==2){
    //         this.handleEditUser(dataset);
    //     }
    //     else if(idx==3){
    //         this.handleDeleteUser(dataset);
    //     }
    // }
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
    
    render() {
        const { jobs,users } = this.props;
        const{user} = this.props;
        console.log(jobs);
        return (
            <div>
                <div  className='top-header' >
                </div>
                <div>
                    <ul className = 'navbar0'>
                        <li><a href="/">Home</a></li>
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
                    
                    <h2>Tasks</h2>
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
                                    <option data-clm='name' >In progress</option>
                                    <option data-clm='email'>Completed</option>
                                    <option data-clm='email'>Overdue</option>
                                </select>
                            </div>
                            <div style={{width: "1%"}}></div>
                            <div className='link'>
                                <Link to={'/createtask'} className='link' style={{float:'right'}}>Add new</Link>

                            </div>
                    </div><br></br>
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
                </div>
                        <div className='flex-container'>
                            <ul className='listing' style={{width:'40%',backgroundColor:'#f1f1f1',padding:'20px'}}>
                                {jobs.items && jobs.items.map((item) => {
                                return <li style={{outline:'auto' ,padding:'5px',borderRadius:'0'}} key={item.id}>
                                    <div>
                                        <h4>{item.title}</h4>
                                        <div style={{wordWrap:'break-word'}}>-{' '}{item.description}{' '}</div>
                                        <br></br>-{item.assignerName}
                                        <br></br>Duedate:{' '}{item.duedate}
                                        
                                    </div>
                                    {user.id==item.assignee ?
                                    (<div className='flex-container' style={{padding:'4px 4px 4px 0'}}>
                                        Update status:{' '}
                                        <select style={{width: "35%",backgroundColor:'#f1f1f1'}} onChange={this.updateStatus}>
                                            <option >{item.status}</option>
                                            <option data-id = {item.id}>In Progress</option>
                                            <option data-id = {item.id}>Completed</option>
                                        </select>
                                    </div>)
                                    :
                                    (<div className='flex-container' style={{padding:'4px 4px 4px 0'}}>
                                    </div>)}
                                    <div className='flex-container'>
                                        <a className='normal-button' onClick={() => this.handleEditUser(item)}>Edit</a>
                                        <a className='normal-button' onClick={() => this.handleDeleteUser(item.id)}>Delete</a>
                                    </div>
                                </li>
                                })}
                            </ul>
                            {/* {jobs.values&&
                            <div style={{width:'50%'}} >Highcharts
                                <HighchartsReact
                                highcharts={Highcharts}
                                options={{
            chart: {
              // renderTo: 'container',
              type: "variablepie",
              margin: [0, 0, 0, 0],
            //   marginLeft: -100,
              events: {
                load: function() {
                  this.renderer
                    .circle(
                      this.chartWidth / 2,
                      this.plotHeight / 2 + this.plotTop,
                      this.plotHeight / 4
                    )
                    .attr({
                      fill: "rgba(0,0,0,0)",
                      stroke: "#2ec277",
                      left: -100,
                      "stroke-width": 1
                    })
                    .add();
                }
              }
            },
            colors: ["#2ec277", "#2db799", "#b7e886", "#6d5494", "#0077b4"],
          
            title: {
              text: null
            },
          
            legend: {
              align: "right",
              verticalAlign: "top",
              layout: "vertical",
              x: 60,
              y: 100,
              itemMarginTop: 5,
              itemMarginBottom: 5,
              itemStyle: {
                font: "17pt Trebuchet MS, Verdana, sans-serif",
                color: "#333333"
              }
            },
            plotOptions: {
              series: {
                stacking: "normal",
                dataLabels: {
                  enabled: false
                },
                showInLegend: true,
                size: 185
              }
            },
          
            series: [
              {
                minPointSize: 5,
                innerSize: "0%",
                zMin: 0,
                name: "Performance",
                data: [
                  {
                    name: 'Completed On Time',
                    y: jobs.values.completedOnTime,
                    z: 99
                  },
                  {
                    name: "Completed After Deadline",
                    y: jobs.values.completedAfterDeadline,
                    z: 99
                  },
                  {
                    name:'Overdue',
                    y:jobs.values.overdue,
                    z: 99
                  },
                  {
                    name:'inprogress',
                    y:jobs.values.inprogress,
                    z: 99
                  },
                  {
                    name:'No Activity',
                    y:jobs.values.noactivity,
                    z: 99
                  },
                ]
              }
            ]
          }}
                                ref="chartComponent1"
                                />
                            </div>
                            } */}
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
    filterTD: userActions.filterbytd,
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