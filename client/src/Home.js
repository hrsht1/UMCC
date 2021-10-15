import "./Home.css";
import React from "react";
import Header from "./components/Header/Header";
import Textdialog from "./components/TextDialog/TextDialog";
import ImageDialog from "./components/ImageDialog/ImageDialog";
import Footer from "./components/Footer/Footer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../client/src/actions/authActions";
import Notification from "./components/Notification/Notification";
import store from "./store";
import FileBase64 from "react-file-base64";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationDialogOpen: false,
      notificationTitle: "",
      descriptionOpen: false,
      descriptionContent:
        "The Upper Murray Community Calendar is a collaborative project between Corryong Neighbourhood Centre, RMIT University, and the communities of the Upper Murray region. The site is currently under construction. ",
      imgUrl: "",
      imgUrlUpload: "",
      imgDialogOpen: false,
      isLogin: true,
    };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_MY_URL + "api/homepageData/6161653a0ebee81b79b8908e")
      .then((res) => {
        this.setState({ imgUrl: res.data.background });
      })
      .catch((err) => { console.log("Error from get background img form database"); });
    axios
      .get(process.env.REACT_APP_MY_URL + "api/homepageData/6161653a0ebee81b79b8908e")
      .then((res) => {
        this.setState({ descriptionContent: res.data.description });
        console.log(this.state.descriptionContent);
      })
      .catch((err) => { console.log("Error from get banner from database"); });
  }


  descriptionOpen = () => {
    this.setState({
      descriptionOpen: true,
    });
  };

  uploadImgToDatabase = (e) => {
    e.preventDefault();
    const data = {
      background: this.state.imgUrlUpload,
    };
    if (data.background !== "") {
      axios
        .put(process.env.REACT_APP_MY_URL + "api/homepageData/6161653a0ebee81b79b8908e", data)
        .then((res) => { this.setState({ imgUrl: this.state.imgUrlUpload }); })
        .catch((err) => {
          console.log("Error in add background img!");
        })
    } else {
      alert("please select an img file");
    }

  }

  imgUploadOpen = () => {
    this.setState({
      imgDialogOpen: true,
    });
  };

  render() {
    return (
      <>
        <div className="App">
        {console.log("store ? ",store.getState())}
          <Header />
          <Notification 
          />
          <img src={this.state.imgUrl} alt="" className="Picture" />
          {store.getState().auth.user.isAdmin ? (<>
          <p>Select an image and click "Upload" to change the cover image. The new image will appear in a few seconds.</p>

              <FileBase64 
                type="file" 
                multiple={false} 
                onDone={({ base64 }) => this.setState({ imgUrlUpload: base64 })} />
              <button className="waves-effect waves-light btn indigo darken-3" onClick={this.uploadImgToDatabase}>Upload</button>
          </>) : null}
          <div className="description">
            <p className="descriptionTitle">
              About the Upper Murray Community Calendar
            </p>
            <p className="descriptionContent" style={{wordWrap: "break-word"}}>
              {this.state.descriptionContent}
            </p>
            {store.getState().auth.user.isAdmin ? (
              <div className="edit">
                <button
                  className="waves-effect waves-light btn indigo darken-3"
                  onClick={this.descriptionOpen}
                >
                  Edit
                </button>
              </div>
            ) : null}
          </div>
          {/* <div className="center">
              <Link
                to="/calendar"
                className="waves-effect waves-light btn indigo darken-3"
              >
                Take me to the calendar
              </Link>
            </div> */}
          {/* <div className="shortcut">
            <p>Shortcuts</p>
            <div className="shortcutContent">
              <div className="shortcut_pic">
                <img src={require("./images/nrc.jpg").default} alt="" />
                <span>Sports</span>
              </div>
              <div className="shortcut_pic">
                <img src={require("./images/bushfire.jpg").default} alt="" />
                <span>Bushfire Recovery</span>
              </div>
              <div className="shortcut_pic">
                <img src={require("./images/arts.jpg").default} alt="" />
                <span>Arts</span>
              </div>
              <div className="shortcut_pic">
                <img src={require("./images/enter.jpg").default} alt="" />
                <span>Entertainment</span>
              </div>
            </div>
          </div> */}

          <Footer />
          {/* <Textdialog
            open={this.state.notificationDialogOpen}
            close={this.closeNotificationDialog.bind(this)}
            title="Emergency Banner"
            content="This will be displayed under the header on each page. To remove the banner, leave the text field empty."
            inputTitle="Enter text and click Confirm"
            multiline={false}
          /> */}
          <Textdialog
            open={this.state.descriptionOpen}
            close={this.closeDescription.bind(this)}
            title="Description"
            content="Input Description Text"
            inputTitle="Description"
            multiline={true}
          />
          <ImageDialog
            open={this.state.imgDialogOpen}
            close={this.closeImgUpload.bind(this)}
            title="Main Page Picture"
            content="Upload Picture"
            url={this.state.imgUrl}
            multiline={true}
          />
        </div>

        {/* <div className="bottom">
         <Footer />
        </div> */}
      </>
    );
  }

  closeImgUpload(imgurl) {
    if (imgurl !== "") {
      this.setState({
        imgDialogOpen: false,
        imgUrl: imgurl,
      });
    } else {
      this.setState({
        imgDialogOpen: false,
      });
    }
  }

  closeDescription(value) {
    if (value !== "") {
      this.setState({
        descriptionOpen: false,
        descriptionContent: value,
      })
      const data = {
        description: value,
      }
      axios
        .put(process.env.REACT_APP_MY_URL + "api/homepageData/6161653a0ebee81b79b8908e", data)
        .catch((err) => {
          console.log("Error from add description to database");
        });
    } else {
      this.setState({
        descriptionOpen: false,
      });
    }
  }

}

Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Home);
