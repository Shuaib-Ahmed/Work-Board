import { useContext, Fragment } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import TaskSection from "./components/TaskSection";
import { MainContext } from "./context/MainContext";

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  const { toDoTask, progressTask, doneTask } = useContext(MainContext);

  return (
    <Fragment>
      <ReactNotifications />
      <Navbar />
      <section className="tasksContainer">
        <TaskSection title="To Do" tasks={toDoTask} />
        <TaskSection
          title="In Progress"
          classname="secondTaskContainer"
          tasks={progressTask}
        />
        <TaskSection title="Done" tasks={doneTask} />
      </section>
    </Fragment>
  );
}

export default App;
