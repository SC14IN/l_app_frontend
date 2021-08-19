import { Button } from "react-bootstrap";
import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import asyncValidate from "./asyncValidate";

const required = (value) =>
	value || typeof value === "number" ? undefined : "Required";
const maxLength = (max) => (value) =>
	value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
export const minLength = (min) => (value) =>
	value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
export const minLength8 = minLength(8);
const email = (value) =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? "Invalid email address"
		: undefined;
const alphaNumeric = (value) =>
	value && /[^a-zA-Z0-9 ]/i.test(value)
		? "Only alphanumeric characters"
		: undefined;
const strongRegex = new RegExp(
	"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const strength = (value) =>
	value && !strongRegex.test(value) ? "Password not strong" : undefined;
const renderField = ({
	input,
	label,
	type,
	meta: { touched, error, warning },
}) => (
	<div>
		<label>{label}</label>
		<div>
			<input
				{...input}
				placeholder={label}
				type={type}
				className={error && touched ? "text-border" : null}
			/>
			<br></br>
			{touched &&
				((error && (
					<span style={{ font: "5px", color: "red" }}>{error}</span>
				)) ||
					(warning && <span style={{ font: "5px" }}>{warning}</span>))}
		</div>
	</div>
);
const SimpleForm = (props) => {
	const { handleSubmit, pristine, reset, submitting } = props;
	return (
		<form onSubmit={handleSubmit}>
			<br></br>
			<Field
				name="name"
				component={renderField}
				type="text"
				label="Name"
				validate={[required, maxLength15, minLength2]}
				warn={alphaNumeric}
			/>
			<Field
				name="email"
				component={renderField}
				type="email"
				label="Email"
				validate={email}
			/>
			<Field
				label="Password"
				name="password"
				type="password"
				component={renderField}
				validate={[required, minLength8, strength]}
			/>
			<Field
				label="Password confirmation"
				name="password_confirmation"
				type="password"
				component={renderField}
				validate={[required]}
			/>
			<h6 style={{ fontSize: "10px" }}>
				{
					"Password should contain atleast 8 characters including atleast one of each lowercase,  uppercase, digit and special character(~!@#$%^&*)."
				}
			</h6>
			<div>
				<Button
					variant="primary"
					type="primary"
					disabled={pristine || submitting}
				>
					Submit
				</Button>
				<Button
					variant="secondary"
					type="button"
					disabled={pristine || submitting}
					onClick={reset}
				>
					Clear Values
				</Button>
			</div>
		</form>
	);
};

export default reduxForm({
	form: "simple",
	validate,
	asyncValidate,
})(SimpleForm);
