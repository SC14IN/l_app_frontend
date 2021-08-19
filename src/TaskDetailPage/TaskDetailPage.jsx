import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../_helpers";
import { userActions } from "../_actions";
// import './styles.scss';
import Highcharts from "highcharts/highstock";
import variablePie from "highcharts/modules/variable-pie.js";
var qs = require("qs");
import { Modal, Button, Card, ListGroup } from "react-bootstrap";

class TasksDetailPage extends React.Component {
	componentDidMount() {
        const id = qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true,
		}).id;
		this.props.getJob(id);
	}
	handleDeleteUser(id) {
		this.props.deletejob(id);
	}
	handleEditUser(job) {
		this.props.dispatchId(job);
		history.push("/editTask");
	}
    updateStatus = (e) => {
		let idx = e.target.selectedIndex;
		let dataset = e.target.options[idx].dataset;
		if (idx == 1) {
			this.props.updatestatus("inprogress", dataset.id);
		} else if (idx == 2) {
			this.props.updatestatus("completed", dataset.id);
		}
	};
	render() {
		const {jobs } = this.props;
		const { user } = this.props;
		
		return (
			<div>
				<div className="top-header">
					<button
						style={{
							float: "right",
							color: "white",
							marginRight: "100px",
							textDecoration: "none",
						}}
						onClick={() => this.props.logout()}
						className="btn btn-link"
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
					
					<div>
						<ul
							className="listing"
							style={{
								position: "relative",
								top: "80px",
							}}
						>
							{jobs.loading && <em>Loading Tasks...</em>}
							{jobs.job &&
								<li
									style={{
										padding: "5px",
										borderRadius: "0",
										listStyleType: "none",
									}}
								>
									<div>
										<Card style={{ width: "25rem" }}>
											<Card.Body>
												<Card.Title>{jobs.job.title}</Card.Title>
												<Card.Text>{jobs.job.description}</Card.Text>
												<ListGroup>
													<ListGroup.Item>
														Assigner: {jobs.job.assignerName}
													</ListGroup.Item>
													<ListGroup.Item>
														Assignee: {jobs.job.assigneeName}
													</ListGroup.Item>
													<ListGroup.Item>Status: {jobs.job.status}</ListGroup.Item>
													<ListGroup.Item>
														Duedate: {jobs.job.duedate}
													</ListGroup.Item>
												</ListGroup>
												{user.id == jobs.job.assignee ? (
													<div
														style={{
															padding: "4px 4px 4px 0",
														}}
													>
														Update status:{" "}
														<select
															style={{
																width: "auto",
																backgroundColor: "#f1f1f1",
															}}
															onChange={this.updateStatus}
														>
															<option>
																{jobs.job.status == "completedOnTime"
																	? "Completed On Time"
																	: jobs.job.status == "completedAfterDeadline"
																	? "Completed After Deadline"
																	: jobs.job.status}
															</option>
															<option data-id={jobs.job.id}>In Progress</option>
															<option data-id={jobs.job.id}>Completed</option>
														</select>
													</div>
												) : (
													<div
														style={{
															padding: "4px 4px 4px 0",
														}}
													></div>
												)}
												{user.id == jobs.job.creator ? (
													<div
														className="flex-container"
														style={{
															backgroundColor: "white",
														}}
													>
														<a
															className="normal-button"
															onClick={() => this.handleEditUser(jobs.job)}
														>
															Edit
														</a>
														<a
															className="normal-button"
															onClick={() => this.handleDeleteUser(jobs.job.id)}
														>
															Delete
														</a>
													</div>
												) : null}
											</Card.Body>
										</Card>
									</div>
								</li>
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
function mapState(state) {
	const { jobs, authentication } = state;
	const { user } = authentication;
	// console.log(values);

	return { user, jobs };
}
const actionCreators = {
	getJob: userActions.filterjobbyid,
	deletejob: userActions.deletejob,
	dispatchId: userActions.editrequest,
	logout: userActions.logout,
	updatestatus: userActions.updatestatus,

};
const connectedPage = connect(mapState, actionCreators)(TasksDetailPage);
export { connectedPage as TasksDetailPage };
