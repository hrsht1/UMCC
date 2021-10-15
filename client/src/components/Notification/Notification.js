import React, { Component } from "react";
import "react-fontawesome";
import "./Notification.css";
import PropTypes from "prop-types";
import store from "../../store";
import Textdialog from "../TextDialog/TextDialog";
import axios from "axios";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionOpen: false,
      descriptionContent: "",
    };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_MY_URL + "api/homepageData/6161653a0ebee81b79b8908e")
      .then((res) => {
        this.setState({ descriptionContent: res.data.banner });
        console.log(this.state.descriptionContent);
      })
      .catch((err) => { console.log("Error from get banner from database"); });
  }

  closeDescription(value) {
    if (value !== "") {
      this.setState({
        descriptionOpen: false,
        descriptionContent: value,
      })
      const data = {
        banner: value,
      }
      axios
      .put(process.env.REACT_APP_MY_URL + "api/homepageData/6161653a0ebee81b79b8908e", data)
      .catch((err) => {
        console.log("Error from add banner to database");
      });
    } else {
      this.setState({
        descriptionOpen: false,
      });
    }
  }

  descriptionOpen = () => {
    this.setState({
      descriptionOpen: true,
    });
  };

  render() {
    return (
      <>
        <div className="notification">
          <i className="medium material-icons left">announcement</i>
          <p className="descriptionContent">{this.state.descriptionContent}</p>
          {store.getState().auth.user.isAdmin ? (
            <button
              className="waves-effect waves-light btn indigo darken-3"
              onClick={this.descriptionOpen}
            >
              Edit
            </button>
          ) : null}
          <Textdialog
            open={this.state.descriptionOpen}
            close={this.closeDescription.bind(this)}
            title="Description"
            content="Change the Emergency Banner Text Here"
            inputTitle="Description"
            multiline={true}
          />
        </div>
      </>
    );
  }
}

Notification.propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.string,
};

export default Notification;
