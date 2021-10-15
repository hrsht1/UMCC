import React from "react";
import { Card, Tooltip, IconButton } from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";
import axios from "axios";
import BookmarkStar from "../BookmarkStar/BookmarkStar";
import store from "../../store";

//TODO: call Event and User Details from DB
const EventDetailsCard = (props) => {
  const { eventID, inputData, userID } = props;

  let content = (
    <>
      <Card>
        <i>Select an event to view details</i>
      </Card>
    </>
  );

  if (eventID) {
    var thisEvent = inputData.find((e) => e.id === eventID);

    content = (
      <>
        <Card>
          <h2>
            <a href={"/event/" + eventID}>{thisEvent.title}</a>
          </h2>
          <p style={{alignContent: "center"}}>
          <a href={"/creator-profile/" + thisEvent.creator}>
            View Event Creator Details{" "}
            </a>
          </p>
          <p>
            When: {thisEvent.start.toLocaleString()} to{" "}
            {thisEvent.end.toLocaleString()}
          </p>
          <p>{thisEvent.desc ? thisEvent.desc : <i>No description</i>}</p>
          <p>
            {thisEvent.categories ? (
              thisEvent.categories.join(", ")
            ) : (
              <i>No categories</i>
            )}
          </p>
          <p>
            {store.getState().auth.user.id ? (
              <BookmarkStar
                eventID={eventID}
                userID={store.getState().auth.user.id}
              />
            ) : null}
          </p>
        </Card>
      </>
    );
  }
  return content;
};

export default EventDetailsCard;
