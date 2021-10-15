import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CreatorProfile.css";
import SingleUserConverter from "../../components/Calendar/UserConverter";
import axios from "axios";


class CreatorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFromBackend: {},
    };
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_MY_URL +
          "api/users/" +
          window.location.pathname.replace("/creator-profile/", "")
      )
      .then((res) => {
        this.setState({
          userFromBackend: SingleUserConverter(res.data),
        });
      })
      .then(
        console.log(
          "Current users from back end (after .then): ",
          this.state.userFromBackend
        )
      )
      .catch((err) => {
        console.log("Error from ShowUserList: ", err);
      });
  }

  render() {
    return (
      <>
        <Header />
        {this.state.userFromBackend.isVisible ? (
          <>
            <h2 className="center">{this.state.userFromBackend.name}</h2>
              <>
                <div
                  className="container center"
                  style={{ position: "relative", minHeight: "100vh" }}
                >
                  <table className="highlight centered responsive-table">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td>Contact Email</td>
                        <td>{this.state.userFromBackend.contact_email}</td>
                      </tr>
                      <tr>
                        <td>Contact Phone</td>
                        <td>{this.state.userFromBackend.contact_phone}</td>
                      </tr>
                      <tr>
                        <td>About</td>
                        <td>{this.state.userFromBackend.description}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  {this.state.userFromBackend.external_link ? (<>
                      
                      <a href={this.state.userFromBackend.external_link}><button
                            className="waves-effect waves-light btn indigo darken-3"
                            onClick=""
                            >
                            View Website
                            </button></a>
                      
                      </>) : null }
                </div>
              </>
          </>
        ) : (
          <h2>This page has not been made public.</h2>
        )}
        <Footer />
      </>
    );
  }
}

export default CreatorProfile;
