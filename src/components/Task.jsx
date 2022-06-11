import React, { useState, useContext } from "react";
import styles from "./css/task.module.css";

import PopUp from "./PopUp";
import { MainContext } from "../context/MainContext";

import { AiOutlineSend, AiOutlineDelete } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";

const Task = ({ taskInFo }) => {
  const [popUp, setPopUp] = useState(false);
  const { updateTask, deleteTask } = useContext(MainContext);

  const { title, description, id, status } = taskInFo;

  const showPopUp = (e) => {
    if (e.type === "contextmenu") {
      e.preventDefault();
      setPopUp((prevState) => !prevState);
    }
  };

  return (
    <div
      className={styles.container}
      onClick={showPopUp}
      onContextMenu={showPopUp}
    >
      <h4>{title}</h4>
      <p>{description}</p>

      {popUp && (
        <PopUp>
          <h5
            onClick={() => {
              updateTask(id, { archive: true });
              setPopUp(false);
            }}
          >
            <FiArchive /> Archive
          </h5>
          <h5
            onClick={() => {
              deleteTask(id);
              setPopUp(false);
            }}
          >
            <AiOutlineDelete /> Delete
          </h5>
          <h5>
            <AiOutlineSend /> Send to
          </h5>
          <ul>
            {status !== "todo" && (
              <li
                onClick={() => {
                  updateTask(id, { status: "todo" });
                  setPopUp(false);
                }}
              >
                Todo
              </li>
            )}
            {status !== "progress" && (
              <li
                onClick={() => {
                  updateTask(id, { status: "progress" });
                  setPopUp(false);
                }}
              >
                In Progress
              </li>
            )}
            {status !== "done" && (
              <li
                onClick={() => {
                  updateTask(id, { status: "done" });
                  setPopUp(false);
                }}
              >
                Done
              </li>
            )}
          </ul>
        </PopUp>
      )}
    </div>
  );
};

export default Task;
