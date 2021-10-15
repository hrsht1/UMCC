import React, { PureComponent } from "react";
import "./Upload.css";

class Upload extends PureComponent {
  constructor(props) {
    super(props);

    this.fileRef = React.createRef();
    this.state = {
      imgUrl: this.props.url,
    };
  }

  render() {
    return (
      <div
        className="uploadContainer"
        onDragOver={this.dragOver}
        onDragEnter={this.dragEnter}
        onDrop={this.drop}
      >
        <input type="file" ref={this.fileRef} onChange={this.uploadFile} />
        <img src={this.state.imgUrl} alt="" onClick={this.onClick} />
      </div>
    );
  }

  onClick = (e) => {
    this.fileRef.current.click();
  };

  uploadFile = (e) => {
    console.log(e);
    console.log(e.target.files);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.props.changeImg(URL.createObjectURL(file));
      this.setState({
        imgUrl: URL.createObjectURL(file),
      });
    }
  };

  dragOver = (e) => {
    e.preventDefault();
  };

  dragEnter = (e) => {
    e.preventDefault();
  };
  drop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    this.props.changeImg(URL.createObjectURL(file));
    this.setState({
      imgUrl: URL.createObjectURL(file),
    });
    console.log(e, file);
  };
}

export default Upload;
