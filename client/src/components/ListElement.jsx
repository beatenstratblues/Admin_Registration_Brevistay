import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListElement = ({ elementData }) => {

  const navigate = useNavigate();

  return (
    <div className="ListElement">
      <div>{elementData.Name}</div>
      <div>{elementData.email}</div>
      <div>{elementData.contact}</div>
      <div>
        <div className="EditButton">Edit</div>
        &nbsp; &nbsp;
        <div
          className="EditButton"
          onClick={() => {
            navigate(`/property/${elementData.uuid}`);
          }}
        >
          View
        </div>
        &nbsp; &nbsp;
        <div className="EditButton" style={{ backgroundColor: "red" }}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default ListElement;
