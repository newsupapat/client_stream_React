import React from "react";
import Modal from "../modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
    // history.push("/");
  };
  actions = () => {
    // <>,</>
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={this.onDelete}>
          Delete
        </button>
        <button className="ui button" onClick={() => history.push("/")}>
          Cancel
        </button>
      </React.Fragment>
    );
  };
  onDismiss = () => {
    history.push("/");
  };
  render() {
    if (!this.props.stream) {
      return <div>Are you sure to Delete this Stream</div>;
    }
    return (
      <div>
        StreamDelete
        <Modal
          title="Delete Stream"
          content={this.props.stream.title}
          action={this.actions()}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
