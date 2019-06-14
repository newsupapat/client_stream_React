import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "166080738760-k0a8023pqbh3m3kfn3nlr7ktj57i5mce.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  componentDidUpdate() {
    console.log(this.props.auth);
  }
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };
  onSignin = () => {
    this.auth.signIn();
  };
  onSignOut = () => {
    this.auth.signOut();
  };
  renderAuthButton() {
    if (this.props.auth === null) {
      return <div class="ui active inline loader" />;
    } else if (!this.props.auth) {
      return (
        <button onClick={this.onSignin} className="ui google red button">
          <i className="google icon" />
          Sign in With Google
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignOut} className="ui google red button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    }
  }
  render() {
    return <div className="item">{this.renderAuthButton()}</div>;
  }
}
const mapstateToProps = state => {
  return { auth: state.auth.isSignedIn };
};

export default connect(
  mapstateToProps,
  { signIn, signOut }
)(GoogleAuth);
