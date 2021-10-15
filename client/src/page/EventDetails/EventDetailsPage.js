import React, { Component } from "react";
import "./EventDetailsPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import EventToCalendarConverter from "../../components/Calendar/EventToCalendarConverter";
import axios from "axios";
import Launch from "@mui/icons-material/Launch";

export default class EventDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsFromBackend: [],
    };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_MY_URL + "api/events")
      .then((res) => {
        this.setState({
          eventsFromBackend: EventToCalendarConverter(res.data),
          currentEvent: EventToCalendarConverter(res.data).find(
            (e) => e.id === window.location.pathname.replace("/event/", "")
          ),
        });
      })
      .then(
        console.log(
          "Current events from back end (after .then): ",
          this.state.eventsFromBackend
        )
      )
      .catch((err) => {
        console.log("Error from ShowEventList: ", err);
      });
  }

  render() {
    const thisEventID = window.location.pathname.replace("/event/", "");
    const thisEvent = this.state.currentEvent;
    console.log("currentEvent: ", this.state.currentEvent);
    console.log("debug: ", thisEventID, thisEvent);

    return (
      <>
        <Header />
        {this.state.currentEvent !== undefined ? (
          <>
            <div
              className="eventContainer"
              style={{ position: "relative", minHeight: "100vh" }}
            >
              <h2>{this.state.currentEvent.title}</h2>
              <p>
                <a href={"/creator-profile/" + this.state.currentEvent.creator}>
                  View Event Creator Details{" "}
                </a>
              </p>
              <p>Start: {this.state.currentEvent.start.toLocaleString()}</p>
              <p>End: {this.state.currentEvent.end.toLocaleString()}</p>
              <p>Description: {this.state.currentEvent.desc}</p>
              {this.state.currentEvent.link ? (
                <p>
                  <a href={this.state.currentEvent.link} target="_blank">
                    View More Details <Launch />
                  </a>
                </p>
              ) : null}
            </div>
          </>
        ) : null}
        <br />
        <Footer />
      </>
    );
  }
}
