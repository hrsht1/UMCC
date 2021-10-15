function EventToTableConverter(inputData) {
  function createData(
    id,
    event_name,
    start_Date,
    end_Date,
    event_time,
    category,
    location,
    active_status
  ) {
    return {
      id,
      event_name,
      start_Date,
      end_Date,
      event_time,
      category,
      location,
      active_status,
    };
  }

  function calculateDuration(duration) {
    const convertedDuration = (Math.floor(((duration) / (1000 * 60 * 60)) % 24));
    if(convertedDuration > 0) {
      return convertedDuration + " hour(s)";
    }
    else {
      return "n/a";
    }
  }

  var rows = [];
  if(inputData){
    inputData.map((event) => {
      if(event.isActive === undefined){
        event.isActive = "true";
      }
      rows.push(
        createData(
          event.id,
          event.title,
          event.start.toLocaleString(),
          event.end.toLocaleString(),
          calculateDuration(event.end - event.start),
          event.categories ? event.categories.join(", ") : "",
          event.location,
          event.isActive
        )
      );
    });
  }
  console.log("converted to ",rows);
  return rows;
}

export default EventToTableConverter;
