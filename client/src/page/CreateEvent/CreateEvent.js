import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import { Avatar } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // KeyboardDatePicker,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Grow from "@material-ui/core/Grow";
import "./CreateEvent.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import Footer from "../../components/Footer/Footer";
import store from "../../store";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_creator_id: "",
      event_title: "",
      event_venue: "",
      event_description: "",
      event_start_date: Date.now(),
      event_end_date: Date.now(),
      event_start_time: Date.now(),
      event_end_time: Date.now(),
      event_category: [],
      event_link: "",
      categories: [
        {
          key: 0,
          label: "All Ages",
          avatar: "../../images/AllAges.jpg",
          checked: false,
        },
        {
          key: 1,
          label: "Art",
          avatar: "../../images/Art.jpg",
          checked: false,
        },
        {
          key: 2,
          label: "Bushfire Recovery",
          avatar: "../../images/BushfireRecovery.jpg",
          checked: false,
        },
        {
          key: 3,
          label: "Education & Training",
          avatar: "../../images/Education&Training.jpg",
          checked: false,
        },
        {
          key: 4,
          label: "Entertainment",
          avatar: "../../images/Entertainment.jpg",
          checked: false,
        },
        {
          key: 5,
          label: "Events",
          avatar: "../../images/Events.jpg",
          checked: false,
        },
        {
          key: 6,
          label: "Information",
          avatar: "../../images/Information.jpg",
          checked: false,
        },
        {
          key: 7,
          label: "Seniors",
          avatar: "../../images/Seniors.jpg",
          checked: false,
        },
        {
          key: 8,
          label: "Social & Support Groups",
          avatar: "../../images/Social&SupportGroups.jpg",
          checked: false,
        },
        {
          key: 9,
          label: "Sport",
          avatar: "../../images/Sport.jpg",
          checked: false,
        },
        {
          key: 10,
          label: "Young Families",
          avatar: "../../images/YoungFamilies.jpg",
          checked: false,
        },
        {
          key: 11,
          label: "Youth",
          avatar: "../../images/Youth.jpg",
          checked: false,
        },
      ],
      event_active: false,
      user_isAuthorized: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_MY_URL +
          "api/users/" +
          store.getState().auth.user.id
      )
      .then((res) => {
        this.setState({ user_isAuthorized: res.isAuthorized });
      });
  }

  getCategoryArray(categoryObjects) {
    var categoryArray = [];
    categoryObjects.forEach((categoryObject) =>
      categoryArray.push(categoryObject.label)
    );
    return categoryArray;
  }

  startDateChange(date) {
    this.setState({
      event_start_date: date,
    });
  }

  endDateChange(date) {
    this.setState({
      event_end_date: date,
    });
  }

  checkChange(category) {
    if (category.checked) {
      this.setState({
        event_category: this.state.event_category.filter(
          (item) => item.key !== category.key
        ),
        categories: this.state.categories.map((item) => {
          if (item.key === category.key) {
            category.checked = !category.checked;
            return category;
          }
          return item;
        }),
      });
    } else {
      this.setState({
        event_category: [
          ...this.state.event_category,
          {
            key: category.key,
            label: category.label,
          },
        ],
        categories: this.state.categories.map((item) => {
          if (item.key === category.key) {
            item.checked = !item.checked;
          }
          return item;
        }),
      });
      console.log(this.state.event_category);
    }
  }

  handleDelete(category) {
    console.log(this.state.event_category);
    this.setState({
      event_category: this.state.event_category.filter(
        (item) => item.key !== category.key
      ),
      categories: this.state.categories.map((item) => {
        if (item.key === category.key) {
          item.checked = !item.checked;
        }
        return item;
      }),
    });
  }

  startTimeChange(date) {
    this.setState({
      event_start_time: date,
    });
  }

  endTimeChange(date) {
    console.log(typeof date);
    this.setState({
      event_end_time: date,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getActiveStatus(isAuthorized) {
    if (isAuthorized) {
      this.setState({ event_active: true });
      return true;
    } else {
      this.setState({ event_active: false });
      return false;
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    // console.log(store.getState().auth.user.id);

    const data = {
      event_creator_id: store.getState().auth.user.id,
      event_title: this.state.event_title,
      event_venue: this.state.event_venue,
      event_description: this.state.event_description,
      event_start_date: this.state.event_start_date,
      event_end_date: this.state.event_end_date,
      event_start_time: this.state.event_start_time,
      event_end_time: this.state.event_end_time,
      event_category: this.getCategoryArray(this.state.event_category),
      event_active: this.getActiveStatus(this.state.user_isAuthorized),
      event_link: this.state.event_link,
    };

    axios
      .post(process.env.REACT_APP_MY_URL + "api/events", data)
      .then((res) => {
        this.setState({
          event_creator_id: "",
          event_title: "",
          event_venue: "",
          event_description: "",
          event_start_date: Date.now(),
          event_end_date: Date.now(),
          event_start_time: Date.now(),
          event_end_time: Date.now(),
          event_category: [],
          event_link: "",
        });
        alert("Event '" + data.event_title + "' created!");
        this.props.history.push("/create");
      })
      .catch((err) => {
        console.log("Error in CreateEvent!");
      });
  };

  render() {
    return (
      <>
        <Header />
        <h2 className="center">Create New Event</h2>
        <p className="center">
          An administrator will review your event. Once approved, it will appear
          on the calendar.
        </p>
        <br />
        <div style={{ border: "5px" }}>
          <form onSubmit={this.onSubmit} className="col s12 container">
            <div className="input-field col s6">
              <input
                placeholder="Event Title"
                id="event_title"
                name="event_title"
                type="text"
                className="validate"
                value={this.state.event_title}
                onChange={this.onChange}
              />
              <label for="event_title">Event Title</label>
            </div>
            <br />
            <div className="input-field col s6">
              <input
                placeholder="Venue"
                id="event_venue"
                name="event_venue"
                type="text"
                className="validate"
                value={this.state.event_venue}
                onChange={this.onChange}
              />
              <label for="last_name">Venue</label>
            </div>
            <br />
            <div className="input-field col s6">
              <textarea
                placeholder="Description"
                id="event_description"
                name="event_description"
                className="materialize-textarea"
                data-length="500"
                value={this.state.event_description}
                onChange={this.onChange}
              />
              <label for="description">Description</label>
            </div>
            <br />
            <div className="input-field col s6">
              <input
                placeholder="External website"
                id="event_link"
                name="event_link"
                type="text"
                className="validate"
                value={this.state.event_link}
                onChange={this.onChange}
              />
              <label for="event_link">Link</label>
            </div>
            <br />
            <div className="inputForm">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div
                  style={{
                    display: "inline-flex",
                    margin: "10px 0",
                    justifyContent: "space-between",
                  }}
                >
                  <DatePicker
                    style={{ width: "50%", padding: "10px" }}
                    format="dd/MM/yyyy"
                    label="Start Date"
                    inputVariant="outlined"
                    value={this.state.event_start_date}
                    onChange={this.startDateChange.bind(this)}
                  />
                  <DatePicker
                    style={{ width: "50%", padding: "10px" }}
                    format="dd/MM/yyyy"
                    label="End Date"
                    inputVariant="outlined"
                    value={this.state.event_end_date}
                    onChange={this.endDateChange.bind(this)}
                  />
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    margin: "10px 0",
                    justifyContent: "space-between",
                  }}
                >
                  <TimePicker
                    style={{ width: "50%", padding: "10px" }}
                    label="Start Time"
                    inputVariant="outlined"
                    value={this.state.event_start_time}
                    onChange={this.startTimeChange.bind(this)}
                  />
                  <TimePicker
                    style={{ width: "50%", padding: "10px" }}
                    label="End Time"
                    inputVariant="outlined"
                    value={this.state.event_end_time}
                    onChange={this.endTimeChange.bind(this)}
                  />
                </div>
              </MuiPickersUtilsProvider>
              <Paper
                style={{
                  padding: "30px",
                  minHeight: "120px",
                  marginTop: "30px",
                  display: "flex",
                  flexWrap: "wrap",
                }}
                elevation={3}
              >
                {this.state.event_category.length === 0 ? (
                  <>Choice Categories</>
                ) : (
                  this.state.event_category.map((category) => {
                    return (
                      <Grow in={true}>
                        <Chip
                          style={{ margin: "10px" }}
                          key={category.key}
                          icon={<TagFacesIcon />}
                          label={category.label}
                          onDelete={this.handleDelete.bind(this, category)}
                        />
                      </Grow>
                    );
                  })
                )}
              </Paper>
              <div className="categoriesBox">
                {this.state.categories.map((category) => {
                  return (
                    console.log(category.label),
                    (
                      <div
                        className={
                          category.checked ? "checkedBox" : "uncheckedBox"
                        }
                        key={category.key}
                      >
                        <Grow in={true}>
                          <FormControlLabel
                            className="categoryCheck"
                            control={
                              <>
                                <Avatar
                                  alt={category.label}
                                  src={category.avatar}
                                  style={{ width: "80px", height: "80px" }}
                                />
                                <Checkbox
                                  checked={category.checked}
                                  onChange={this.checkChange.bind(
                                    this,
                                    category
                                  )}
                                  name="checkedB"
                                  color="primary"
                                />
                              </>
                            }
                            label={category.label}
                          />
                        </Grow>
                      </div>
                    )
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: "0 0 50px 0",
                }}
              >
                <CustomButton type="submit" btntext="Add" />
                <CustomButton btntext="Cancel" />
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </>
    );
  }
}

export default CreateEvent;
