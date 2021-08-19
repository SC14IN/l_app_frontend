import { userActions } from "../_actions";

const asyncValidate = (values /*, dispatch */) => {
	return userActions.checkemail(values).then((error) => {
		// console.log(error);
		if (error.ok == false) {
			throw { email: "Email already exists" };
		}
	});
};

export default asyncValidate;
