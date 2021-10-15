import React, { Component } from "react";
import "./CustomButton.css";

class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnClass: this.props.size === "sm" ? "small-btn btn" : "btn",
      btnColor:
        this.props.color === "secondary"
          ? { backgroundColor: "var(--secondColor)", color: "var(--mainColor)" }
          : {
              backgroundColor: "var(--mainColor)",
              color: "var(--secondColor)",
            },
    };
  }
  render() {
    return (
      <>
        <button
          {...this.props}
          style={this.state.btnColor}
          className={this.state.btnClass}
          onClick={this.props.onClick}
        >
          {this.props.btntext}
        </button>
      </>
    );
  }
}

export default CustomButton;
