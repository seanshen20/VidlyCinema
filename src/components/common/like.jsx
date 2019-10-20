import React from "react";

export default props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={() => props.onClick()}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};


