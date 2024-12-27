import React, { useState } from 'react';
import { BsFillRocketTakeoffFill } from "react-icons/bs";

const Kanban = () => {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });

    const addTask = (column, task) => {
        if (!task) return;
        setTasks({
            ...tasks,
            [column]: [...tasks[column], task]
        });
    };

    //remove task function
    const removeTask = (column, index) => {
        const newTasks = tasks[column].filter((_, i) => i !== index);
        setTasks({
            ...tasks,
            [column]: newTasks
        });
    };

    // function to move to the next column
    const moveTask = (from, to, index) => {
        const task = tasks[from][index];
        const newTasks = tasks[from].filter((_, i) => i !== index);
        setTasks({
            ...tasks,
            [from]: newTasks,
            [to]: [...tasks[to], task]
        });
    };

    return (
        <div className="min-h-screen p-5 pt-24 dark:bg-gray-900 dark:text-white bg-white text-black">
            <h1 className="text-3xl text-center font-bold mb-4">Kanban Board</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['todo', 'inProgress', 'done'].map((column) => (
                    <div key={column} className="p-4 rounded-lg dark:bg-gray-800 bg-gray-200">
                        <h2 className="text-xl text-center font-semibold mb-2 capitalize">{column}</h2>
                        <ul>
                            {tasks[column].map((task, index) => (
                                <li key={index} className="p-2 rounded mb-2 dark:bg-gray-700 bg-gray-300 flex justify-between items-center">
                                    {task}
                                    <div>
                                        {column !== 'done' && (
                                            <button
                                                className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded mr-2 mb-2 md:mb-0"
                                                onClick={() => moveTask(column, column === 'todo' ? 'inProgress' : 'done', index)}
                                            >
                                                {column === 'todo' ? 'Start' : 'Finish'}
                                            </button>
                                        )}
                                        {column !== 'todo' && (
                                            <button
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded mr-2 mb-2 md:mb-0"
                                                onClick={() => moveTask(column, column === 'done' ? 'inProgress' : 'todo', index)}
                                            >
                                                {column === 'done' ? 'Undo' : 'Back'}
                                            </button>
                                        )}
                                        <button
                                            className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => removeTask(column, index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 w-full rounded"
                            onClick={() => addTask(column, prompt(`Add a new task to ${column}`))}
                        >
                            + Add Task
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kanban;