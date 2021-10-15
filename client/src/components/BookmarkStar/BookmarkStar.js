import React, { Component } from "react";
import { Star, StarBorder, ViewArray } from "@material-ui/icons";
import { Tooltip, IconButton } from "@material-ui/core";
import axios from "axios";
import SingleUserConverter from "../Calendar/UserConverter";

class BookmarkStar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventID: this.props.eventID,
      //TODO remove temp hardcode for testing
      userID: this.props.userID,
      bookmarked: false,
      user: {},
    };
  }

  componentDidMount() {
    this.setState({ userID: this.props.userID });
    axios
      .get(process.env.REACT_APP_MY_URL + "api/users/" + this.state.userID)
      .then((res) => {
        this.setState({
          user: SingleUserConverter(res.data),
        });
      })
      .catch((err) => {
        console.log("Error from UserAPI ", err);
      });

    if (this.state.user.bookmarked_events) {
      if (this.state.user.bookmarked_events.includes(this.state.eventID)) {
        this.setState({ bookmarked: true });
      }
    }
  }

  toggleBookmark() {
    if (this.state.user.bookmarked_events) {
      if (!this.state.user.bookmarked_events.includes(this.state.eventID)) {
        console.log("inside add to bookmarks");
        var bookmarkArray = this.state.user.bookmarked_events;
        bookmarkArray.push(this.state.eventID);
        axios.put(
          process.env.REACT_APP_MY_URL + "api/users/" + this.state.userID,
          {
            bookmarked_events: bookmarkArray,
          }
        );
        this.setState({ bookmarked: true });
      } else {
        console.log(
          "inside delete from bookmarks with event ?",
          this.state.eventID
        );
        var bookmarkArray = this.state.user.bookmarked_events.filter(
          (e) => e !== this.state.eventID
        );
        console.log("new bookmarkArray ? ", bookmarkArray);
        axios.put(
          process.env.REACT_APP_MY_URL + "api/users/" + this.state.userID,
          {
            bookmarked_events: bookmarkArray,
          }
        );
        this.setState({ bookmarked: false });
      }
      window.location.reload();
    }
  }

  render() {
    var bookmarkedList = this.state.user.bookmarked_events;
    {
      console.log(bookmarkedList);
    }

    var icon = (
      <Tooltip title="Click to add to bookmarks">
        <IconButton onClick={() => this.toggleBookmark()}>
          <StarBorder />
        </IconButton>
      </Tooltip>
    );

    if (bookmarkedList) {
      if (bookmarkedList.includes(this.state.eventID)) {
        icon = (
          <Tooltip title="Click to remove from bookmarks">
            <IconButton onClick={() => this.toggleBookmark()}>
              <Star />{" "}
            </IconButton>
          </Tooltip>
        );
      }
    }

    return icon;
  }
}

export default BookmarkStar;
