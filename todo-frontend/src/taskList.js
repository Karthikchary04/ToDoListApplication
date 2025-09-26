import React, { useEffect, useState } from "react";
import TaskItem from "./taskItems";

function TaskList() {
    const [tasks, settasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        fetch('http://localhost:8080/api/tasks', {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error While Fetching Tasks');
            }
            return res.json();
        })
        .then(data => {
            const tasksData = data.map(task => ({
                ...task
            }));
            settasks(tasksData)
            setLoading(false)
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

 
    // const [activeTaskId, setActiveTaskId] = useState(null);
    // const handleTaskClick = (id) => {
    //     setActiveTaskId(prev => (prev === id ? null : id));
    // }

    return (
    <div className="task-cards-container">
    {tasks.map(task => (
      <TaskItem key={task.id} task={task} />
    ))}
  </div>
  );

}

export default TaskList;