// models/Event.js

const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  event_title: {
    type: String,
    required: true,
  },
  event_creator_id: {
    type: String,
    required: true,
  },
  event_venue: {
    type: String,
    required: true,
  },
  event_description: {
    type: String,
    required: true,
  },
  event_start_date: {
    type: Date,
    required: true,
  },
  event_end_date: {
    type: Date,
    required: true,
  },
  event_start_time: {
    type: Date,
    required: true,
  },
  event_end_time: {
    type: Date,
    required: true,
  },
  event_category: {
    type: [String],
  },
  event_link: {
    type: String,
  },
  event_active: {
    type: String,
    required: true,
  },
  event_image_url: {
    type: String,
  },
});

module.exports = Event = mongoose.model("event", EventSchema);
