import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../_helpers";
import { userActions } from "../_actions";
// import SideNav from './Sidebar';
// import "./styles.scss";

import Highcharts from "highcharts/highstock";
import variablePie from "highcharts/modules/variable-pie.js";
import HighchartsReact from "highcharts-react-official";

variablePie(Highcharts);

class TaskOverviewPage extends React.Component {
    componentDidMount() {
        this.props.alertclear();
        this.props.getUsers();
        this.props.getjobs();
        // let overviewId = JSON.parse(localStorage.getItem('overviewId'));
        this.props.getValues();
        this.props.getValuesByMonth();
        // localStorage.removeItem('overviewId');
    }
    render() {
        const { jobs, users } = this.props;
        const { user } = this.props;
        return (
        <div>
            <div className="top-header" ><button
					style={{float:'right',color:'white',marginRight:'100px',textDecoration:'none'}}
					onClick={() => this.props.logout()}
					class="btn btn-link"
					>Logout
				</button></div>
            <div>
            <ul className="navbar0">
                <li>
                <a href="/">Users</a>
                </li>
                <li>
                <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                <a className="active" href="/tasks">
                    Tasks
                </a>
                </li>
            </ul>
            </div>

            <div className="big-container" style={{ marginLeft: "20%" }}>
                <ul className="flex-container" style={{ listStyleType: "none",position:'relative',top:'40px',position:'fixed', zIndex: "10",width:'100%'  }}>
                    <li>
                    <a  href="/tasks">
                        List
                    </a>
                    </li>
                    <li>
                    <a   className="active" href="/overview">Overview</a>
                    </li>
                    <li>
                    <a href="/tasks">Archived</a>
                    </li>
                </ul>

                <h2 style={{ position:'relative',top:'80px',position:'fixed', zIndex: "10",backgroundColor:"white",width:'100%'  }}>Tasks</h2>
                <div style={{ position:'relative',top:'120px'}}>
                {jobs.loading && <em>Loading Charts...</em>}
                        {jobs.error && <span className="text-danger">ERROR: {jobs.error}</span>}
                    {jobs.values && (
                    <div style={{ }}>
                        Performance
                        <HighchartsReact
                        highcharts={Highcharts}
                        options={{
	                        maintainAspectRatio: false,
                            chart: {
                            // renderTo: 'container',
                            type: "variablepie",
                            margin: [0, 0, 0, 0],
                            events: {
                                load: function () {
                                this.renderer
                                    .circle(
                                    this.chartWidth / 2,
                                    this.plotHeight / 2 + this.plotTop,
                                    this.plotHeight / 4
                                    )
                                    .attr({
                                    fill: "rgba(0,0,0,0)",
                                    // stroke: "#2ec277",
                                    left: -100,
                                    "stroke-width": 1,
                                    })
                                    .add();
                                },
                            },
                            },
                            colors: [
                            "#39DF39",
                            "#FF8C00",
                            "#FF0000",
                            "#BEFDBE",
                            "#808080",
                            ],

                            title: {
                            text: null,
                            },
                            height:'30px',
                            legend: {
                            align: "right",
                            verticalAlign: "top",
                            layout: "vertical",
                            x: 0,
                            y: 0,
                            itemMarginTop: 5,
                            itemMarginBottom: 5,
                            itemStyle: {
                                font: "10pt Trebuchet MS, Verdana, sans-serif",
                                color: "#333333",
                            },
                            },
                            plotOptions: {
                            series: {
                                stacking: "normal",
                                dataLabels: {
                                enabled: false,
                                },
                                showInLegend: true,
                                size: 200,
                                marginLeft: 50,
                            },
                            },

                            series: [
                            {
                                minPointSize: 5,
                                innerSize: "0%",
                                zMin: 0,
                                name: "Performance",
                                data: [
                                {
                                    name: "Completed On Time",
                                    y: jobs.values.completedOnTime,
                                    z: 100,
                                },
                                {
                                    name: "Completed After Deadline",
                                    y: jobs.values.completedAfterDeadline,
                                    z: 100,
                                },
                                {
                                    name: "Overdue",
                                    y: jobs.values.overdue,
                                    z: 100,
                                },
                                {
                                    name: "inprogress",
                                    y: jobs.values.inprogress,
                                    z: 100,
                                },
                                {
                                    name: "No Activity",
                                    y: jobs.values.noactivity,
                                    z: 100,
                                },
                                ],
                            },
                            ],
                        }}
                        ref="chartComponent1"
                    
                        />
                    </div>
                    )}
                    {jobs.monthlyValues && (
                    <div style={{ width: "auto" }}>
                        
                        <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: {
                            type: "column",
                            },
                            scales: {
                                yAxes: [
                                    {
                                    ticks: {
                                        precision: 0,
                                        beginAtZero: true,
                                    },
                                    },
                                ],
                            },

                            xAxis: {
                                categories: [
                                    'Jan',
                                    'Feb',
                                    'Mar',
                                    'Apr',
                                    'May',
                                    'Jun',
                                    'Jul',
                                    'Aug',
                                    'Sep',
                                    'Oct',
                                    'Nov',
                                    'Dec'
                                ],
                                // crosshair: true
                            },
                            colors: [
                            "#39DF39",
                            "#FF8C00",
                            "#FF0000",
                            "#00FF7F",
                            "#808080",
                            ],

                            title: {
                            text: null,
                            },
                            tooltip: {
                                // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                // pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                //     '<td style="padding:0"><b>{point.y} </b></td></tr>',
                                // footerFormat: '</table>',
                                // shared: true,
                                // useHTML: true
                            },
                            series: [{
                                    name: "Completed On Time",
                                    data: jobs.monthlyValues.completedOnTime
                                },
                                {
                                    name: "Completed After Deadline",
                                    data: jobs.monthlyValues.completedAfterDeadline,
                                },
                                {
                                    name: "Overdue",
                                    data: jobs.monthlyValues.overdue,
                                }
                            ],
                        }}
                        />
                    </div>
                    )}
                    
                </div>
            </div>
            
            
        </div>
        );
    }
}
function mapState(state) {
  const { jobs, authentication, users,overviewId } = state;
  const { user } = authentication;
  // console.log(values);

  return { user, jobs, users,overviewId };
}
const actionCreators = {
  getjobs: userActions.getjobs,
  deletejob: userActions.deletejob,
  filterTD: userActions.filterbytd,
  filterbystatus: userActions.filterbystatus,
  getUsers: userActions.getAll,
  filterbyassignee: userActions.filterbyassignee,
  filterbyassigner: userActions.filterbyassigner,
  dispatchId: userActions.editrequest,
  getValues: userActions.getvalues,
  getValuesByMonth: userActions.getvaluesbymonth,
  alertclear: userActions.alertclear,
  logout: userActions.logout,
};
const connectedPage = connect(mapState, actionCreators)(TaskOverviewPage);
export { connectedPage as TaskOverviewPage };
