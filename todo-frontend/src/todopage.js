import React from "react";
import TaskList from './taskList';
import CreateTasks from './createTasks';
import { useState } from "react";

function TodoPage() {
    const [fetchTasks, setFetchTasks] = useState(false);
    const handleFetchTasks = () => {
        setFetchTasks(previousState => !previousState ? true : false);
    };

    return(
    <div className="todo-container">
      <h1>My ToDo List</h1>
      <button onClick={handleFetchTasks} className="btn btn-primary btn-fetch">Fetch Tasks</button>
        {fetchTasks && <TaskList />}
      <div className="create-task">
        <h2>Create New Task</h2>
        <CreateTasks />
      </div>
    </div>
    );
}

export default TodoPage;