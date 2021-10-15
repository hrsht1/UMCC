import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventDetailsCard from "../EventDetailsCard/EventDetailsCard";
import { Grid, Card } from "@material-ui/core";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useHistory } from "react-router-dom";
import store from "../../store";


const localizer = momentLocalizer(moment);

const BasicCalendar = (props) => {
  const { eventData, filter } = props;

  const [eventID, setEventID] = useState();
  const [eventsArray, setEventsArray] = useState([eventData]);

  const categoryFilter = () => {
    if (filter.length > 0) {
      var newEventsArray = [];
      eventData.map((event) => {
        if (event.categories) {
          if (event.categories.some((x) => filter.includes(x)))
            newEventsArray.push(event);
        }
      });
      setEventsArray([newEventsArray]);
      console.log("events after filtering: ", newEventsArray);
    } else {
      setEventsArray([eventData]);
    }
  };

  const actualCalendar = (
    <>
      <Grid
        container
        direction="row"
        spacing={1}
        justifyContent="flex-start"
        alignItems="center"
        // xs={12}
        // s={12}
        // md={12}
        // lg={12}
      >
        <Grid item md={12} lg={12}>
          <Card raised={true}>
            <Calendar
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={eventsArray[0]}
              style={{ height: "100vh" }}
              onSelectEvent={(data) => showEventDetails(data)}
            />
          </Card>
        </Grid>
        <Grid item>
          <EventDetailsCard
            eventID={eventID}
            inputData={eventData}
            userID={store.getState().auth.user.id}
          />
        </Grid>
        {filter ? (
          <Grid item>
            <h3>
              <button
                id="filterButton"
                className="btn waves-effect waves-light indigo darken-3"
                onClick={categoryFilter}
              >
                Apply filters{" "}
              </button>
            </h3>
          </Grid>
        ) : null}
      </Grid>
    </>
  );

  // const history = useHistory();

  function showEventDetails(event) {
    // history.push("/calendar:" + event.id);
    console.log("event clicked: " + event.title);
    setEventID(event.id);
  }

  return (
    <>
      <div className="BasicCalendar">{actualCalendar}</div>
    </>
  );
};

export default BasicCalendar;
