const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = "Required";
	}
	if (!values.email) {
		errors.email = "Required";
	}
	if (!values.password) {
		errors.password = "Required";
	}
	if (!values.password_confirmation) {
		errors.password_confirmation = "Required";
	}
	if (values.password != values.password_confirmation) {
		errors.password_confirmation = "Passwords do not match";
	}
	return errors;
};

export default validate;
