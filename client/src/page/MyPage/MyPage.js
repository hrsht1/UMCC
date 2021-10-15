import React, { Component } from "react";
import Header from "../../components/Header/Header";
import "./MyPage.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
import BasicCalendar from "../../components/Calendar/Calendar";
import axios from "axios";
import EventToCalendarConverter from "../../components/Calendar/EventToCalendarConverter";
import SingleUserConverter from "../../components/Calendar/UserConverter";
import Footer from "../../components/Footer/Footer";
import store from "../../store";
import DeleteIcon from "@material-ui/icons/Delete";

export default class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsFromBackend: [],
      userID: "",
      userFromBackend: {},
      createdEvents: [],
      bookmarkedEvents: [],
    };
  }

  componentDidMount() {
    //set user
    this.setState({
      userID: store.getState().auth.user.id,
    });

    //eventlist
    axios
      .get(process.env.REACT_APP_MY_URL + "api/events")
      .then((res) => {
        this.setState({
          eventsFromBackend: EventToCalendarConverter(res.data),
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

    //userlist
    axios
      .get(process.env.REACT_APP_MY_URL + "api/users/" + store.getState().auth.user.id)
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
    const eventList = this.state.eventsFromBackend;
    const currentUser = this.state.userFromBackend;

    var calendarComponent = (
      <BasicCalendar eventData={allMyEvents(currentUser)} />
    );

    function myCreatedEvents(user) {
      var eventArray = [];
      eventArray = eventList.filter(
        (e) => e.creator === user._id,
      );
      return eventArray;
    }

    function myBookmarkedEvents(user) {
      var eventArray = [];
      if(user.bookmarked_events) {
          eventArray = eventList.filter((e) =>
          user.bookmarked_events.includes(e.id)
        );
      }
      return eventArray;
    }

    function allMyEvents(user) {
      var eventArray = [];
      if(user.bookmarked_events) {
        eventArray = eventList.filter((e) =>
        user.bookmarked_events.includes(e.id) || e.creator === user._id
      );
      }
      return eventArray;
    }

    return (
      <>
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            margin: "0 auto 100px auto",
          }}
        >
          <h3 style={{ marginTop: "50px" }}>Events I've Created</h3>
          <p>Select an event and click the <DeleteIcon /> icon to delete it.</p>
          {eventList.length > 0 ? (
            <EnhancedTable inputData={myCreatedEvents(currentUser)} />
          ) : null}
          <h3 style={{ margin: "20px 0" }}>Events I've Bookmarked</h3>
          {eventList.length > 0 ? (
            <EnhancedTable inputData={myBookmarkedEvents(currentUser)} isBookmarkTable={true} />
          ) : null}
        </div>
        <div className="eventContainer">
        <h3 style={{ margin: "20px 0" }}>My Personal Calendar</h3>
        <p>All of the events you've created or bookmarked will appear here.</p>
          <div>
            {allMyEvents(currentUser).length > 0
             ? <BasicCalendar eventData={allMyEvents(currentUser)} /> : null}
          </div>
          <button
            className="btn waves-effect waves-light indigo darken-3"
            name="action"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            Back to Home Page
          </button>
        </div>
        <br />
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
