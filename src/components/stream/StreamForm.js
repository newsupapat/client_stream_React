import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = value => {
    this.props.onSubmit(value);
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
        <Field
          name="title"
          component={this.renderInput}
          type="text"
          label="Title"
        />
        <Field
          name="description"
          component={this.renderInput}
          type="text"
          label="Description"
        />
        <button className="ui button primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const validate = value => {
  const errors = {};
  if (!value.title) {
    errors.title = "Please Enter Title!";
  }
  if (!value.description) {
    errors.description = "Please Enter description!";
  }
  return errors;
};
export default reduxForm({
  form: "streamCreate",
  validate
})(StreamForm);
