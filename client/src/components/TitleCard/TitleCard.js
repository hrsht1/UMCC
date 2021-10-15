import React from "react";

const TitleCard = (props) => {
  const { titleText } = props;
  const defaultStyle = useStyles();
  const imgUrl = require("../../images/titlecard.jpg").default;


  return (
    <div>
      <img alt="" className="image" src={imgUrl} />
      <h1 className="centered">{titleText}</h1>
    </div>
  );
};

export default TitleCard;
