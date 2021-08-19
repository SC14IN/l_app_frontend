import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";
import SimpleForm from "./ReduxForm";

class RegisterPage extends React.Component {
	render() {
		const { registering, register } = this.props;
		return (
			<div className="formdiv">
				<h2>Register</h2>
				<SimpleForm onSubmit={register} />
				<div>
					Already have an account?
					<Link to="/login" className="btn btn-link">
						Login
					</Link>
				</div>
			</div>
		);
	}
}

function mapState(state) {
	const { registering } = state.registration;
	return { registering };
}

const actionCreators = {
	register: userActions.register,
};

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
