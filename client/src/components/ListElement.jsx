import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListElement = ({ elementData }) => {

  const navigate = useNavigate();

  async function handleDelete(uuid) {
    await fetch(`http://localhost:8000/api/admins/${uuid}`,{
      method: 'delete',
    }).then((res)=>{
      if(res.ok) {
        navigate(0);
      }
    });
  }

  return (
    <div className="ListElement">
      <div>{elementData.Name}</div>
      <div>{elementData.email}</div>
      <div>{elementData.contact}</div>
      <div>
        <div className="EditButton" onClick={()=>{
          navigate(`/update/${elementData.uuid}`)
        }}>Edit</div>
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
        <div className="EditButton" style={{ backgroundColor: "red" }} onClick={()=>{handleDelete(elementData.uuid)}}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default ListElement;
