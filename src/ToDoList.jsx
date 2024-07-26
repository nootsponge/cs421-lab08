import React, { useState } from "react";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const toggleEditTask = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, editing: !task.editing };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Enter a new task"
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span
                            style={{
                                textDecoration: task.completed
                                    ? "line-through"
                                    : "none",
                                cursor: "pointer",
                                display: task.editing ? "none" : "inline",
                            }}
                            onClick={() => toggleTaskCompletion(index)}
                        >
                            {task.text}
                        </span>
                        <input
                            style={{
                                display: task.editing ? "inline" : "none",
                            }}
                            type="text"
                            value={task.text}
                            onChange={(e) => {
                                const updatedTasks = tasks.map((t, i) => {
                                    if (i === index) {
                                        return { ...t, text: e.target.value };
                                    }
                                    return t;
                                });
                                setTasks(updatedTasks);
                            }}
                        />{" "}
                        <button onClick={() => toggleEditTask(index)}>
                            {task.editing ? "Save" : "Edit"}
                        </button>
                        <button onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
