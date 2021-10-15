import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import Upload from "../Upload/Upload";

export default class Imgdialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: this.props.url,
    };
  }

  submitData = () => {
    this.props.close(this.state.imgUrl);
  };

  updateImgUrl(imgurl) {
    this.setState({
      imgUrl: imgurl,
    });
  }
  cancelClick = () => {
    this.setState({
      imgUrl: this.props.url,
    });
    this.props.close("");
  };

  closeDialog = (e, reason) => {
    if (reason !== "backdropClick") {
      this.props.close();
    }
  };

  render() {
    return (
      <Dialog
        maxWidth="md"
        fullWidth
        open={this.props.open}
        onClose={this.closeDialog}
        disableEscapeKeyDown={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{this.props.content}</DialogContentText>
          <Upload
            url={this.state.imgUrl}
            changeImg={this.updateImgUrl.bind(this)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelClick} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submitData.bind(this)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
