import React, { Component } from "react";
import Header from "../../components/Header/Header";
import "./EditProfile.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Footer from "../../components/Footer/Footer";
import store from "../../store";
import classnames from "classnames";
import EmailIcon from "@mui/icons-material/Email";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import InfoIcon from "@mui/icons-material/Info";
import PasswordIcon from "@mui/icons-material/Password";
import { updateUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
var bcrypt = require("bcryptjs");

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      contact_email: "",
      contact_phone: "",
      description: "",
      password: "",
      password2: "",
      errors: {},
      hashedPassword: "",
    };
  }

  onChange = (e) => {
    if(e.target.id === "password2"){
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.state.password2, salt, (err, hash) => {
          if (err) throw err;
          this.setState({hashedPassword: hash});
        })
      });
    }
    this.setState({ [e.target.id]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  componentDidMount() {
    // axios
    //   .get(process.env.REACT_APP_MY_URL + "api/users")
    //   .then((res) => {
    //     this.setState({
    //       eventsFromBackend: EventToCalendarConverter(res.data),
    //     });
    //   })
    //   .then(
    //     console.log(
    //       "Current users from back end (after .then): ",
    //       this.state.eventsFromBackend
    //     )
    //   )
    //   .catch((err) => {
    //     console.log("Error from ShowUserList: ", err);
    //   });
  }

  onSubmit = (e) => {
    e.preventDefault();

    var newUser = {
      name: this.state.name,
      email: store.getState().auth.user.email,
      contact_email: this.state.contact_email,
      contact_phone: this.state.contact_phone,
      description: this.state.description,
      password: this.state.hashedPassword,
      password2: this.state.hashedPassword,
    };

    axios.put(process.env.REACT_APP_MY_URL + "api/users/" + store.getState().auth.user.id, newUser);

    // this.props.updateUser(newUser, this.props.history);
    window.location.reload();
  };

  render() {
    const { errors } = this.state;

    return (
      <>
        {console.log(store.getState().auth.user.email)}
        <Header />
        <h3 className="center">Edit your personal details here</h3>
        <div
          className="row container"
          style={{ position: "relative", minHeight: "100vh", width: "50%" }}
        >
          <form noValidate onSubmit={this.onSubmit} className="col s12">
            <div className="row input-field col s12">
              <AccountCircleIcon />
              <input
                placeholder="Name"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name,
                })}
              />
              <span className="red-text">{errors.name}</span>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Name
              </span>
            </div>
            <div className="row input-field col s12">
              <EmailIcon />
              <input
                // onChange={this.onChange}
                value={store.getState().auth.user.email}
                error={errors.email}
                id="email"
                type="email"
                disabled
                // className={classnames("", {
                //   invalid: errors.email,
                // })}
              />
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Registered E-Mail
              </span>
            </div>
            <div className="input-field col s12">
              <AlternateEmailIcon />
              <input
                placeholder="Contact Email"
                onChange={this.onChange}
                error={errors.contact_email}
                id="contact_email"
                type="email"
                className={classnames("", {
                  invalid: errors.contact_email,
                })}
              />
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Contact Email
              </span>
              <span className="red-text">{errors.contact_email}</span>
            </div>
            <div className="input-field col s12">
              <ContactPhoneIcon />
              <input
                placeholder="Contact Phone"
                onChange={this.onChange}
                value={this.state.contact_phone}
                id="contact_phone"
                type="text"
                className="validate"
                maxLength="10"
              ></input>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Please enter your 10 digit phone number
              </span>
            </div>
            <div className="input-field col s12">
              <InfoIcon />
              <textarea
                placeholder="About"
                onChange={this.onChange}
                value={this.state.description}
                id="description"
                type="text"
                className="materialize-textarea validate"
              ></textarea>
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                About
              </span>
            </div>
            <br />
            <PasswordIcon />
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password,
                })}
              />
              <label htmlFor="password">New Password</label>
              <span className="red-text">{errors.password}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("", {
                  invalid: errors.password2,
                })}
              />
              <label htmlFor="password2">Confirm New Password</label>
              <span className="red-text">{errors.password2}</span>
            </div>
            <div className="col s12 center" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable indigo darken-3"
              >
                Update
              </button>
              <p>Your changes will be reflected next time you log in.</p>
            </div>
          </form>
        </div>
        <Footer />
      </>
    );
  }
  click() {
    this.props.history.push("/profile");
  }
  RangeChange(dates) {
    console.log(dates);
  }
}

EditProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateUser })(
  withRouter(EditProfile)
);
