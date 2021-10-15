import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProfilePage.css";
import { Link } from "react-router-dom";

import store from "../../store";

class ProfilePage extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <>
        <Header />
        <h2 className="center">Contact details</h2>
        {store.getState().auth.user ? (
          <>
            <div
              className="container center"
              style={{ position: "relative", minHeight: "100vh" }}
            >
              <table className="highlight centered responsive-table">
                <thead></thead>
                <tbody>
                  <tr>
                    <td>User Name</td>
                    <td>{store.getState().auth.user.name}</td>
                  </tr>
                  <tr>
                    <td>Registered Email</td>
                    <td>{store.getState().auth.user.email}</td>
                  </tr>
                  <tr>
                    <td>Contact Email</td>
                    <td>{store.getState().auth.user.contact_email}</td>
                  </tr>
                  <tr>
                    <td>Contact Phone</td>
                    <td>{store.getState().auth.user.contact_phone}</td>
                  </tr>
                  <tr>
                    <td>About</td>
                    <td>{store.getState().auth.user.description}</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <Link to="/editprofile">
                <button
                  className="waves-effect waves-light btn indigo darken-3"
                  onClick=""
                >
                  Edit Details
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div
            style={{
              marginTop: "200px",
              marginBottom: "50px",
              marginLeft: "50px",
            }}
          >
            <h2>This profile is hidden by the User.</h2>
          </div>
        )}
        <Footer />
      </>
    );
  }
}

export default ProfilePage;
