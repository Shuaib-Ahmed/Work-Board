import React, { useState, useContext } from "react";
import styles from "./css/taskSection.module.css";

import PopUp from "./PopUp";
import Task from "./Task";
import { MainContext } from "../context/MainContext";
import { notification } from "../utils/notification";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { BiMessageSquareAdd } from "react-icons/bi";

const TaskSection = ({ title, classname, tasks }) => {
  const [popUp, setPopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({});
  const { createTask } = useContext(MainContext);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const showPopUp = (e) => {
    if (e.type === "contextmenu" && title === "To Do") {
      e.preventDefault();
      setPopUp((prevState) => !prevState);
    }
  };

  const changeHandler = (e) => {
    setTask((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value.trim(),
    }));
  };

  const createNewTask = (e) => {
    e.preventDefault();
    createTask(task);
    setOpen(false);
    notification("Success", "Successfuly added new task", "success");
  };

  return (
    <section className={`${classname} ${styles.container}`}>
      <h3 onClick={showPopUp} onContextMenu={showPopUp}>
        {title}

        {popUp && (
          <PopUp>
            <h5
              onClick={() => {
                onOpenModal();
                setPopUp(false);
              }}
            >
              <BiMessageSquareAdd />
              Add Task
            </h5>
          </PopUp>
        )}
      </h3>

      <section className={styles.taskContainer}>
        {tasks.map((taskInFo, index) => (
          <Task taskInFo={taskInFo} key={index} />
        ))}

        {tasks.length === 0 && <p>Sorry no task for this section !!!</p>}
      </section>

      <Modal open={open} onClose={onCloseModal} center>
        <div className={styles.modal}>
          <h3>Craete new task</h3>
          <form onSubmit={createNewTask}>
            <div>
              <label htmlFor="title">
                Title <span>(Max 20 characters)</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Plaese enter task title"
                required
                maxLength={20}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="description">
                Description <span>(Max 50 characters)</span>
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Please enter task description"
                required
                maxLength={50}
                onChange={changeHandler}
              />
            </div>
            <button type="submit">Add new task</button>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default TaskSection;
