import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
// import SideNav from './Sidebar';
import { history } from "../_helpers";
import Highcharts from "highcharts/highstock";
import variablePie from "highcharts/modules/variable-pie.js";
//import HighchartsReact from "./HighchartsReact.js";
import HighchartsReact from "highcharts-react-official";

variablePie(Highcharts);

class DashboardPage extends React.Component {
  componentDidMount() {
    this.props.getjobs();
    this.props.getValuesByMonth();
    this.props.getValues();
  }
  handleDeleteUser(id) {
    this.props.deletejob(id);
  }
  handleDeleteself() {
    this.props.deleteself();
    
  }
  render() {
    const { jobs, user } = this.props;
    return (
      <div>
        <div style={{ backgroundColor: "#555", height: "40px" }}></div>
        <div>
          <ul className="navbar0">
            <li>
              <a href="/">Users</a>
            </li>
            <li>
              <a className="active" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/tasks">Tasks</a>
            </li>
          </ul>
        </div>
        <div style={{ marginLeft: "20%" }}>
          <div className='flex-container'>
            <h2>Tasks</h2>
            <div style={{flexGrow:'8'}}>
            {/* {<button
							style={{float:'right'}}
							onClick={this.handleDeleteself()}
							className="btn btn-outline-danger"
							disabled={user.isDeleting}
							>
							{user.isDeleting ? (
								<span className="spinner-border spinner-border-sm"></span>
							) : (
								<span >Delete account</span>
							)}
							</button>} */}
              </div>
          </div>
          {/* {jobs.loading && <em>Loading Tasks...</em>}
                        {jobs.error && <span className="text-danger">ERROR: {jobs.error}</span>} */}
          <div className="flex-container">
            <ul
              className="listing"
              style={{
                width: "40%",
                backgroundColor: "#f1f1f1",
                padding: "20px",
              }}
            >
              {jobs.items &&
                //jobs.items.slice(1,3) &&
                jobs.items.map((item, id) => {
                  return (
                    <li
                      style={{
                        // outline: "auto",
                        padding: "5px",
                        borderRadius: "0",
                      }}
                      key={item.id}
                    >
                      <div>
                        <h4>{item.title}</h4>
                        <div style={{ wordWrap: "break-word" }}>
                          - {item.description}{" "}
                        </div>
                        <br></br>Assigner: {item.assignerName}
                        <br></br>Assignee: {item.assigneeName}
                        <br></br>Status: {item.status}
                        <br></br>Duedate: {item.duedate}
                      </div>
                      {/* <div className="flex-container">
                            <a
                            className="normal-button"
                            onClick={() => this.handleEditUser(item)}
                            >
                            Edit
                            </a>
                            <a
                            className="normal-button"
                            onClick={() => this.handleDeleteUser(item.id)}
                            >
                            Delete
                            </a>
                        </div> */}
                    </li>
                  );
                })}
            </ul>
            
              <div style={{flexGrow:'8'}}>
                {jobs.values && (
                  <div style={{ width: "100%" }}>
                    My Performance
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={{
                        chart: {
                          // renderTo: 'container',
                          type: "variablepie",
                          margin: [0, 0, 0, 0],
                          //   marginLeft: -100,
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
                          "#228B22",
                          "#FF8C00",
                          "#FF0000",
                          "#00FF7F",
                          "#808080",
                        ],

                        title: {
                          text: null,
                        },

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
                            // marginLeft: 5,
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
                <br></br>
                {jobs.monthlyValues && (
                  <div style={{ width: "100%" }}>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={{
                        chart: {
                          type: "column",
                        },
                        xAxis: {
                          categories: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ],
                          // crosshair: true
                        },
                        yAxis: {
                          min: 0,
                          title: {
                            text: null,
                          },
                        },
                        colors: [
                          "#228B22",
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
                        plotOptions: {
                          column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                          },
                        },
                        series: [
                          {
                            name: "Completed On Time",
                            data: jobs.monthlyValues.completedOnTime,
                          },
                          {
                            name: "Completed After Deadline",
                            data: jobs.monthlyValues.completedAfterDeadline,
                          },
                          {
                            name: "Overdue",
                            data: jobs.monthlyValues.overdue,
                          },
                        ],
                      }}
                      ref="chartComponent2"
                    />
                  </div>
                )}
              </div>
            
          </div>
        </div>
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
  getjobs: userActions.getjobs,
  deletejob: userActions.deletejob,
  getValues: userActions.getvalues,
  getValuesByMonth: userActions.getvaluesbymonth,
  deleteself: userActions.deleteself,
};
const connectedPage = connect(mapState, actionCreators)(DashboardPage);
export { connectedPage as DashboardPage };
