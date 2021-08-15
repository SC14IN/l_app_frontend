import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../_helpers";

import { userActions } from "../_actions";
// import './HomePage.html';
import SideNav from "./Sidebar";

class HomePage extends React.Component {
	componentDidMount() {
		this.props.alertclear();
		this.props.getAll();
		this.props.getUser();
	}
	handleDeleteUser(id) {
		return (e) => this.props.deleteUser(id);
	}
	filterById(e) {
		let input = e.target.value;
		this.props.filterbyid(input);
	}
	filterByName(e) {
		let input = e.target.value;
		this.props.filterbyname(input);
	}
	filterByEmail(e) {
		let input = e.target.value;
		this.props.filterbyemail(input);
	}
	filterByRole(e) {
		let input = e.target.value;
		this.props.filterbyrole(input);
	}
	selectSort = (e) => {
		let idx = e.target.selectedIndex;
		let dataset = e.target.options[idx].dataset;
		if (idx == 1) {
		this.props.sortbyname("asc");
		} else if (idx == 2) {
		this.props.sortbyname("desc");
		} else if (idx == 3) {
		this.props.sortbyemail("asc");
		} else {
		this.props.sortbyemail("desc");
		}
	};
	userOverview(overviewId,name,email) {
		// localStorage.setItem("overviewId", JSON.stringify(overviewId));
		history.push("/performance?id="+overviewId+"&name="+name+"&email="+email);
	}
	render() {
		const { users } = this.props;

		return (
		<div>
			<div
			className="top-header"
			style={{ position:'relative',top:'0',position: "fixed", width: "100%", zIndex: "1000" }}
			><button
					style={{float:'right',color:'white',marginRight:'100px',textDecoration:'none'}}
					onClick={() => this.props.logout()}
					class="btn btn-link"
					>Logout
				</button></div>
			{/* <SideNav name = 'sidenav'/> */}
			<ul className="navbar0">
			<li>
				<a className="active" href="/">
				Users
				</a>
			</li>
			<li>
				<a href="/dashboard">Dashboard</a>
			</li>
			<li>
				<a href="/tasks">Tasks</a>
			</li>
			</ul>
			<section className="section" style={{ marginLeft: "20%" }}>
			<div
				style={{
				width: "60%",
				position: "relative",
				top: "40px",
				position: "fixed",
				zIndex: "1",
				backgroundColor: "white",
				height:'40px'
				}}
			>
				User Managemant
				
			</div>
			<div
				className="flex-container"
				style={{
				position: "relative",
				top: "70px",
				position: "fixed",
				width: "60%",
				zIndex: "1",
				}}
			>
				<div>
				<input
					onChange={(e) => {
					this.filterByName(e);
					}}
					placeholder="Filter by Name or Email"
				/>
				</div>
				<div>
				<select onChange={this.selectSort}>
					<option>Sort by</option>
					<option data-clm="name">Name A-Z</option>
					<option data-clm="name">Name Z-A</option>
					<option data-clm="email">Email A-Z</option>
					<option data-clm="email">Email Z-A</option>
				</select>
				</div>
				<div style={{flexGrow:'5'}}>
				{users.user && users.user.role=='admin'?<Link to={'/createUser'} className="btn btn-sm btn-success mb-2" style={{float:'right'}}>Add User</Link> : null}
				</div>
			</div>
			<div style={{ position: "relative", top: "140px",width:'60%'}}>
			
				<ul
				className="users-listing"
				style={{ fontSize: "20px", zIndex: "-1" }}
				>{users.loading && <em>Loading Users...</em>}
                        {/* {users.error && <span className="text-danger">ERROR: {users.error}</span>} */}
				{users.items &&
					users.items.map((user) => (
					<div className='flex-container' key={user.id}>
						
						<div>
						{users.user && users.user.role=='admin'?
							(<a
							className="link-button"
							style={{ textDecoration: "none" }}
							onClick={() => this.userOverview(user.id,user.name,user.email)}
							>
							{user.name}
							</a>)
							:(<a>{user.name}</a>)
						}
							<br></br>
						
							{user.email}
						
						</div>
						<div style={{ whiteSpace: "nowrap",flexGrow:'8' }}>
						{users.user && users.user.role=='admin'?
							(<button
							style={{float:'right'}}
							onClick={this.handleDeleteUser(user.id)}
							className="btn btn-outline-danger"
							disabled={user.isDeleting}
							>
							{user.isDeleting ? (
								<span className="spinner-border spinner-border-sm"></span>
							) : (
								<span style={{}}>Delete</span>
							)}
							</button>)
							: null
						}
						</div>
					</div>
					))}
				</ul>
			</div>
			{/* <div style={{ position: "relative", top: "150px" }}>
				<Link to="/login">Logout</Link>
			</div> */}
			</section>
		</div>
		);
	}
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
	getAll: userActions.getAll,
	getUser: userActions.getuser,
	deleteUser: userActions.delete,
	createUser: userActions.createuser,
	filterbyid: userActions.filterbyid,
	filterbyname: userActions.filterbyname,
	filterbyrole: userActions.filterbyrole,
	filterbyemail: userActions.filterbyemail,
	sortbyname: userActions.sortbyname,
	sortbyemail: userActions.sortbyemail,
	alertclear: userActions.alertclear,
	logout: userActions.logout,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
