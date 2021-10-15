function UserToTableConverter(inputData) {
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

  var rows = [];
  if (inputData) {
    inputData.map((user) => {
      rows.push(
        createData(
          user._id,
          "user._id",
          user.email,
          user.name,
          user.isAdmin.toString(), 
          user.isAuthorized.toString(), 
          user.visible ? user.visible : "true", //TODO user.visible should be in DB
          1 //TODO events.filter(e => e.creator === user.id).toString
        )
      );
    });
  }
  console.log("rows ? ",rows);
  return rows;
}

export default UserToTableConverter;
