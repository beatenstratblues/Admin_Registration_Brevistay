import React from "react";

const ListElement = () => {
  return (
    <div className="ListElement">
      <div>Jatin Singh</div>
      <div>singh.jatin609@gmail.com</div>
      <div>9717463316</div>
      <div>A-217, flat no-202, Shalimar Gardern ext-2</div>
      <div>
        <div className="EditButton">Edit</div>
        &nbsp;
        &nbsp;
        <div className="EditButton">View</div>
        &nbsp;
        &nbsp;
        <div className="EditButton" style={{backgroundColor:"red"}}>Delete</div>
      </div>
    </div>
  );
};

export default ListElement;
