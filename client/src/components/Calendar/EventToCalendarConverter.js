// import Moment from 'moment';

// <Moment format="YYYY/MM/DD">{this.props.dateToFormat}</Moment>

// {
//     this.props.data.map((post,key) =>
//         <div key={key} className="post-detail">
//             <h1>{post.title}</h1>
//             <p>{moment( new Date(eventItem.event_start_date_time)).format("dd/MM/YYYY")}</p>
//             <p dangerouslySetInnerHTML={{__html: post.content}}></p>
//             <hr />
//         </div>
//     )}

function dateConverter(dateString, timeString) {
  const date = dateString.split("T")[0];
  const time = timeString.split("T")[1];
  const dateTimeString = date + "T" + time;

  return new Date(dateTimeString);
}

function EventToCalendarConverter(dataFromBackend){
        var convertedData = []; 
        dataFromBackend.forEach((eventItem) => 
            {var convertedEvent = {
                id: eventItem._id,
                title: eventItem.event_title,
                start: dateConverter(eventItem.event_start_date, eventItem.event_start_time),
                end: dateConverter(eventItem.event_end_date, eventItem.event_end_time),
                creator: eventItem.event_creator_id,
                categories: eventItem.event_category,
                desc: eventItem.event_description,
                isActive: eventItem.event_active,
                location: eventItem.event_venue,
                link: eventItem.event_link
            };
            convertedData.push(convertedEvent);
        }
            );
    return convertedData;
};


export default EventToCalendarConverter;
