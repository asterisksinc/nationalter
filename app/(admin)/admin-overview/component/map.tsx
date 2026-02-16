import React, { useState } from "react";

import ReactDatamaps from "react-india-states-map";
import "../analytics/analytics-dashboard.css";

const STATES = {
  Maharashtra: {
    value: 50,
    content: {
      txt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A quisquam quae laboriosam sed magni aliquam dolore sequi libero harum, hic nihil. Omnis eos deserunt molestiae harum, cum nemo et temporibus?"
    }
  }
};

const Example = () => {
  const [activeState, setactiveState] = useState({
    data: STATES.Maharashtra,
    name: "India"
  });

  const [stateLists, setStateLists] = useState(STATES);

  const stateOnClick = (data, name) => {
    setactiveState({ data, name });
  };

  return (
      <div className="dg-map-wrapper">

    <ReactDatamaps
      regionData={stateLists}
      mapLayout={{
        hoverTitle: "Count",
        noDataColor: "#c7c7c7",
        borderColor: "#000000",
        hoverColor: "#FB6004",
        hoverBorderColor: "#74407A"
      }}
      hoverComponent={({ value }) => {
        return (
          <>
            <p>{value.name}</p>
          </>
        );
      }}
      onClick={stateOnClick}
      activeState={activeState}
    /></div>
  );
};

export default Example;
