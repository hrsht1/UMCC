import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class Textdialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
    };
  }

  setValue = (e) => {
    const value = e.target.value;
    this.setState({
      inputText: value,
    });
  };
  submitData = (value, e) => {
    this.props.close(value);
    this.setState({
      inputText: "",
    });
  };

  cancelClick = (e) => {
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
          <TextField
            multiline={this.props.multiline}
            autoFocus
            margin="dense"
            id="name"
            label={this.props.inputTitle}
            type="text"
            value={this.state.inputText}
            onChange={this.setValue}
            ref={this.inputRef}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancelClick} color="primary" id="cancel">
            Cancel
          </Button>
          <Button
            onClick={this.submitData.bind(this, this.state.inputText)}
            color="primary"
            id="confirm"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Textdialog;
