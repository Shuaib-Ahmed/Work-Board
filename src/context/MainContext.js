import React, { createContext, useEffect, useState } from "react";

import { notification } from "../utils/notification";

import uuid from "react-uuid";

const initialState = {
  createTask: (task) => {},
  updateTask: (id, data) => {},
  deleteTask: (id) => {},
  changeSearchQuery: (query) => {},
  changeShowArchive: () => {},
  toDoTask: [],
  progressTask: [],
  doneTask: [],
  searchQuery: "",
  showArchive: false,
};

export const MainContext = createContext(initialState);

const MainContextProvider = ({ children }) => {
  const [toDoTask, setToDotask] = useState([]);
  const [progressTask, setProgresstask] = useState([]);
  const [doneTask, setDonetask] = useState([]);
  const [showArchive, setShowArchive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [render, setRender] = useState(false);

  const createTask = (task) => {
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    const newTask = { ...task, status: "todo", archive: false, id: uuid() };

    if (taskList === null) {
      taskList = [newTask];
    } else {
      taskList.push(newTask);
    }

    localStorage.setItem("tasks", JSON.stringify(taskList));
    setRender((prevState) => !prevState);
  };

  const getTasks = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      if (!showArchive) {
        tasks = tasks.filter(({ archive }) => archive === false);
      }

      if (searchQuery.trim().length) {
        tasks = tasks.filter(({ title }) => {
          return title.toLowerCase().includes(searchQuery.toLowerCase());
        });
      }

      const todo = tasks.filter(({ status }) => status === "todo");
      const progess = tasks.filter(({ status }) => status === "progress");
      const done = tasks.filter(({ status }) => status === "done");

      setToDotask(todo);
      setProgresstask(progess);
      setDonetask(done);
    }
  };

  const deleteTask = (id) => {
    if (window.confirm("Are u sure u want to delete this task ...")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      if (tasks) {
        tasks = tasks.filter(({ id: taskId }) => taskId !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setRender((prevState) => !prevState);
        notification("Deleted", "Successfuly deleted task", "danger");
      }
    }
  };

  const updateTask = (id, data) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      const index = tasks.findIndex((task) => task.id === id);

      if (index >= 0) {
        tasks[index] = { ...tasks[index], ...data };
        localStorage.setItem("tasks", JSON.stringify(tasks));

        if (data.archive) {
          notification("Success", "Successfuly archived", "success");
        }

        if (data.status) {
          notification("Success", "Successfuly updated status", "success");
        }

        setRender((prevState) => !prevState);
      }
    }
  };

  const changeSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const changeShowArchive = () => {
    setShowArchive((prevState) => !prevState);
  };

  useEffect(() => {
    getTasks();
    console.log("reder");
  }, [render, searchQuery, showArchive]);

  return (
    <MainContext.Provider
      value={{
        createTask,
        updateTask,
        deleteTask,
        changeSearchQuery,
        changeShowArchive,
        toDoTask,
        progressTask,
        doneTask,
        searchQuery,
        showArchive,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
