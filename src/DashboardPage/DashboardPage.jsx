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
        this.props.alertclear();
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
		// console.log(user);
		return (
			<div>
				<div
					className="top-header"
					style={{ backgroundColor: "#555", height: "40px" }}
				>
					<button
						style={{
							float: "right",
							color: "white",
							marginRight: "100px",
							textDecoration: "none",
						}}
						onClick={() => this.props.logout()}
						class="btn btn-link"
					>
						Logout
					</button>
				</div>
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
					<div className="flex-container">
						<h2
							style={{
								position: "relative",
								top: "40px",
								position: "fixed",
								zIndex: "10",
								backgroundColor: "white",
								width: "100%",
							}}
						>
							Tasks
						</h2>
						<div style={{ flexGrow: "8" }}>
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
					<div
						className="flex-container"
						style={{ position: "relative", top: "120px" }}
					>
						<ul
							className="listing"
							style={{
								width: "40%",
								backgroundColor: "#f1f1f1",
								padding: "20px",
							}}
						>
							{jobs.loading && <em>Loading...</em>}
							{/* {jobs.error && (
								<span className="text-danger">
									ERROR: {jobs.error}
								</span>
							)} */}
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
												<div
													style={{
														wordWrap: "break-word",
													}}
												>
													- {item.description}{" "}
												</div>
												<br></br>Assigner:{" "}
												{item.assignerName}
												<br></br>Assignee:{" "}
												{item.assigneeName}
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

						<div style={{ flexGrow: "8" }}>
							{/* {jobs.loading && <em>Loading Charts...</em>}
                        {jobs.error && <span className="text-danger">ERROR: {jobs.error}</span>} */}
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
																this
																	.chartWidth /
																	2,
																this
																	.plotHeight /
																	2 +
																	this
																		.plotTop,
																this
																	.plotHeight /
																	4
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
													cursor: "pointer",
													stacking: "normal",
													dataLabels: {
														enabled: false,
													},
													showInLegend: true,
													size: 200,
													// marginLeft: 5,
												},
											},
											plotOptions: {
												series: {
													point: {
														events: {
															click: function () {
																location.href =
																	"http://localhost:8080/tasks" +
																	this.options
																		.key;
															},
														},
													},
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
															y: jobs.values
																.completedOnTime,
															key: "?status=CompletedOnTime&id="+user.id,
															z: 100,
														},
														{
															name: "Completed After Deadline",
															y: jobs.values
																.completedAfterDeadline,
															key: "?status=CompletedAfterDeadline&id="+user.id,
															z: 100,
														},
														{
															name: "Overdue",
															y: jobs.values
																.overdue,
															key: "?status=Overdue&id="+user.id,
															z: 100,
														},
														{
															name: "inprogress",
															y: jobs.values
																.inprogress,
															key: "?status=Inprogress&id="+user.id,
															z: 100,
														},
														{
															name: "No Activity",
															y: jobs.values
																.noactivity,
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
												crosshair: true,
											},
											yAxes: {
												minTickInterval: 1,
											},
											colors: [
												"#39DF39",
												"#FF8C00",
												"#FF0000",
												"#00FF7F",
												"#808080",
											],
											series: [
												{
													name: "Completed On Time",
													data: jobs.monthlyValues
														.completedOnTime,
												},
												{
													name: "Completed After Deadline",
													data: jobs.monthlyValues
														.completedAfterDeadline,
												},
												{
													name: "Overdue",
													data: jobs.monthlyValues
														.overdue,
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
	alertclear: userActions.alertclear,
	logout: userActions.logout,
};
const connectedPage = connect(mapState, actionCreators)(DashboardPage);
export { connectedPage as DashboardPage };
