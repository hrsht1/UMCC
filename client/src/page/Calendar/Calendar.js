import React, { Component } from "react";
import "./Calendar.css";
import Header from "../../components/Header/Header";
import BasicCalendar from "../../components/Calendar/Calendar";
import CategoryTags from "../../components/CategoryTags/CategoryTags";
import Footer from "../../components/Footer/Footer";

import data from "../../asset/eventdata";
import axios from "axios";
import EventToCalendarConverter from "../../components/Calendar/EventToCalendarConverter";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shownEvents: data,
      selectable: true,
      filters: [],
      eventsFromBackend: [],
    };
  }

  componentDidMount() {
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
  }

  filtering(newFilters) {
    // console.log("newFilters: ", newFilters);
    this.setState({ filters: newFilters });
  }

  activeFilter(eventData) {
    var activeEvents = [];
    eventData.filter((event) => {
      if(event.isActive === undefined || event.isActive === "true"){
        activeEvents.push(event);
      }
    });
    return activeEvents;
  }

  render() {
    const eventList = this.activeFilter(this.state.eventsFromBackend);
    // console.log("eventlist:", eventList);

    var calendarComponent = (
      <BasicCalendar eventData={eventList} filter={this.state.filters} />
    );

    return (
      <>
        <Header />
        <h3 className="center"> Master Calendar</h3>
        <p className="center">
          Here you can find the complete calendar listing all of the upcoming events in the region.
        </p>
        <div className="calendar-container">
          <div className="fixed">
            {this.state.eventsFromBackend.length > 0 ? calendarComponent : null}
          </div>
          <div className="flex-item">
            <CategoryTags
              onChange={(selectedTags) => this.filtering(selectedTags)}
            />
          </div>
          <br />
        </div>
        <div className="center">
          <h5>
            Logged-in users can create an event :
            <a href="/create">
              <button
                id="createEventButton"
                className="btn waves-effect waves-light indigo darken-3"
              >
                Create A New Event
              </button>
            </a>
          </h5>
        </div>
        <br />
        <Footer />
      </>
    );
  }
}
