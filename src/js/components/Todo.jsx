import React from "react";


const Todo = ({ task, deleteTask }) => {


    return (

        <li className="todo-item">


            <span>

                {task.label}

            </span>



            <button

                className="delete-btn"

                onClick={() => deleteTask(task.id)}

            >

                ✕

            </button>



        </li>

    );


};


export default Todo;