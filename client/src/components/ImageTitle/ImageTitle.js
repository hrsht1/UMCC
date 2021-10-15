import React, { Component } from "react";
import imgUrl from "../../images/TitleCard.jpg";
import "./ImageTitle.css";

class ImageTitle extends Component {
  render() {
    return (
      <>
        <img className="title-img" src={imgUrl} alt="" />
        <p className="imgText">{this.props.title}</p>
      </>
    );
  }
}

export default ImageTitle;
