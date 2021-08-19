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
import SimpleForm from "./ReduxForm";

variablePie(Highcharts);
function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<SimpleForm onSubmit={userActions.createtask} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

class TasksPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			filter: {
				string: "",
				status: qs.parse(this.props.location.search, {
					ignoreQueryPrefix: true,
				}).status,
				assigner: "",
				assignee: qs.parse(this.props.location.search, {
					ignoreQueryPrefix: true,
				}).id,
			},
			modalShow: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectAssignee = this.selectAssignee.bind(this);
		this.selectAssigner = this.selectAssigner.bind(this);
		this.selectStatus = this.selectStatus.bind(this);
		this.setModalShow = this.setModalShow.bind(this);
		this.handlecreate = this.handlecreate.bind(this);
	}
	componentDidMount() {
		this.props.alertclear();
		this.props.getUsers();
		this.props.getjobs();
		this.props.getValues();

		const status = qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true,
		}).status;
		const id = qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true,
		}).id;
		if (status || id) {
			this.handleSubmit();
		}
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
	filterTD(e) {
		let input = e.target.value;
		const { filter } = this.state;
		this.setState({
			filter: {
				...filter,
				string: input,
			},
		});
	}
	selectStatus(e) {
		const { filter } = this.state;
		this.setState({
			filter: {
				...filter,
				status: e.target.value,
			},
		});
	}
	selectAssignee(e) {
		const { filter } = this.state;
		this.setState({
			filter: {
				...filter,
				assignee: e.target.value,
			},
		});
	}
	selectAssigner(e) {
		const { filter } = this.state;
		this.setState({
			filter: {
				...filter,
				assigner: e.target.value,
			},
		});
	}
	handleSubmit() {
		const { filter } = this.state;
		this.props.filtertasks({ ...filter });
	}
	taskOverview(id) {
		history.push("/taskdetailpage?id=" + id);
	}
	setModalShow(e) {
		this.setState({ modalShow: e });
	}
	handlecreate(values) {
		this.setState({ modalShow: false });
		this.props.createTask(values).then((user) => {
			this.props.getjobs();
		});
	}
	render() {
		const { jobs, users, user, createTask } = this.props;
		const { modalShow } = this.state;
		const status = qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true,
		}).status;
		const id = qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true,
		}).id;

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
					<ul
						className="flex-container"
						style={{
							listStyleType: "none",
							position: "relative",
							top: "40px",
							position: "fixed",
							zIndex: "10",
							width: "60%",
						}}
					>
						<li>
							<a className="active" href="/tasks">
								List
							</a>
						</li>
						<li>
							<a href="/overview">Overview</a>
						</li>
						<li>
							<a href="/tasks">Archived</a>
						</li>
					</ul>
					<div
						className="flex-container"
						style={{
							position: "relative",
							top: "80px",
							position: "fixed",
							zIndex: "10",
							backgroundColor: "white",
							width: "60%",
						}}
					>
						<h2>Tasks</h2>
						<div className="link-1" style={{ flexGrow: "5" }}>
							<Link
								to={"/createtask?id=" + user.id}
								className="link"
								style={{ float: "right" }}
							>
								Add new
							</Link>
						</div>
					</div>
					<div
						className="flex-container-fixed"
						style={{
							position: "relative",
							top: "120px",
							position: "fixed",
							zIndex: "10",
							width: "60%",
						}}
					>
						<div className="flex-container">
							<div style={{ width: "30%" }}>
								<input
									onChange={(e) => {
										this.filterTD(e);
									}}
									style={{
										width: "100%",
										backgroundColor: "#f1f1f1",
									}}
									placeholder="Search by Title or Description"
								/>
							</div>
							<div style={{ width: "5%" }}></div>
							<div>By status</div>
							<div className="status">
								<select
									style={{
										width: "auto",
										backgroundColor: "#f1f1f1",
									}}
									onChange={this.selectStatus}
								>
									{status ? <option>{status}</option> : null}
									<option>All</option>
									{status == "Inprogress" ? null : <option>Inprogress</option>}
									{status == "CompletedOnTime" ? null : (
										<option value="CompletedOnTime">Completed On Time</option>
									)}
									{status == "CompletedAfterDeadline" ? null : (
										<option value="CompletedAfterDeadline">
											Completed After Deadline
										</option>
									)}
									{status == "Overdue" ? null : <option>Overdue</option>}
								</select>
							</div>
							<div style={{ width: "1%" }}></div>
						</div>
						<br></br>
						<div className="flex-container">
							<div>Assigner</div>
							<div>
								<select
									style={{
										width: "100%",
										backgroundColor: "#f1f1f1",
									}}
									onChange={this.selectAssigner}
								>
									<option>All</option>
									{users.items &&
										users.items.map((item) => (
											<option value={item.id} key={item.id}>
												{item.id == user.id ? "Me" : item.email}
											</option>
										))}
								</select>
							</div>
							<div>Assignee</div>
							<div>
								<select
									style={{
										width: "100%",
										backgroundColor: "#f1f1f1",
									}}
									onChange={this.selectAssignee}
								>
									{id ? <option>Me</option> : null}
									<option>All</option>
									{users.items &&
										users.items.map((item) =>
											item.id == user.id ? (
												id ? null : (
													<option value={item.id} key={item.id}>
														Me
													</option>
												)
											) : (
												<option value={item.id} key={item.id}>
													{item.email}
												</option>
											)
										)}
								</select>
							</div>
							<div style={{ flexGrow: "5" }}>
								<a
									className="normal-button"
									style={{ float: "right" }}
									onClick={() => this.handleSubmit()}
								>
									Apply filters
								</a>
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
						<ul
							className="listing"
							style={{
								position: "relative",
								top: "300px",
							}}
						>
							<Button variant="primary" onClick={() => this.setModalShow(true)}>
								Add task
							</Button>
							<Modal
								show={modalShow}
								onHide={() => this.setModalShow(false)}
								animation={false}
							>
								<Modal.Header closeButton>
									<Modal.Title>Modal heading</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<SimpleForm onSubmit={this.handlecreate} />
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={() => this.setModalShow(false)}>
										Close
									</Button>
								</Modal.Footer>
							</Modal>
							{jobs.loading && <em>Loading Tasks...</em>}

							{jobs.items &&
								jobs.items.map((item) => {
									return (
										<li
											style={{
												padding: "5px",
												borderRadius: "0",
												listStyleType: "none",
											}}
											key={item.id}
										>
											<div>
												<Card style={{ width: "25rem" }}>
													<Card.Body>
														<Card.Title
															className="link-button"
															style={{ color: "blue", cursor: "pointer" }}
															onClick={() => this.taskOverview(item.id)}
														>
															{item.title}
														</Card.Title>
														<Card.Text>{item.description}</Card.Text>
													</Card.Body>
												</Card>
											</div>
										</li>
									);
								})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
function mapState(state) {
	const { jobs, authentication, users } = state;
	const { user } = authentication;
	return { user, jobs, users };
}
const actionCreators = {
	getjobs: userActions.getjobs,
	deletejob: userActions.deletejob,
	filtertasks: userActions.filtertasks,
	filterbystatus: userActions.filterbystatus,
	getUsers: userActions.getAll,
	filterbyassignee: userActions.filterbyassignee,
	filterbyassigner: userActions.filterbyassigner,
	dispatchId: userActions.editrequest,
	getValues: userActions.getvalues,
	updatestatus: userActions.updatestatus,
	getValuesByMonth: userActions.getvaluesbymonth,
	alertclear: userActions.alertclear,
	logout: userActions.logout,
	createTask: userActions.createtask,
};
const connectedPage = connect(mapState, actionCreators)(TasksPage);
export { connectedPage as TasksPage };
