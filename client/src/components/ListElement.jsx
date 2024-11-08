import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
        <Link to={`/property/${elementData.uuid}`}>
          <div className="EditButton">View</div>
        </Link>
        &nbsp; &nbsp;
        <div className="EditButton" style={{ backgroundColor: "red" }}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default ListElement;
