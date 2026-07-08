import React, { useEffect, useState } from "react";
import Todo from "./Todo";


const username = "kevincastillovega";


const Home = () => {


    const [tasks, setTasks] = useState([]);

    const [newTask, setNewTask] = useState("");



    // GET TASKS

    const getTasks = () => {

        fetch(`https://playground.4geeks.com/todo/todos?username=${username}`)

            .then(resp => resp.json())

            .then(data => {

                console.log("Tasks from API:", data);

                setTasks(Array.isArray(data) ? data : []);

            })

            .catch(error => {

                console.log(error);

            });

    };





    // LOAD TASKS WHEN PAGE OPENS

    useEffect(() => {

        getTasks();

    }, []);






    // ADD TASK

    const addTask = (event) => {


        console.log("Pressed:", event.key);



        if (event.key === "Enter" && newTask.trim() !== "") {



            const task = {

                label: newTask,

                is_done: false

            };




            fetch(
                `https://playground.4geeks.com/todo/todos/${username}`,
                {

                    method: "POST",

                    body: JSON.stringify(task),

                    headers: {

                        "Content-Type": "application/json"

                    }

                }
            )


            .then(resp => resp.json())


            .then(data => {


                console.log("Created task:", data);


                setNewTask("");


                getTasks();


            })


            .catch(error => {


                console.log(error);


            });


        }


    };








    // DELETE ONE TASK

    const deleteTask = (id) => {


        fetch(
            `https://playground.4geeks.com/todo/todos/${id}`,
            {

                method: "DELETE"

            }
        )


        .then(() => {


            getTasks();


        })

        .catch(error => {


            console.log(error);


        });


    };








    // DELETE ALL TASKS

    const clearAll = () => {


        tasks.forEach(task => {


            fetch(

                `https://playground.4geeks.com/todo/todos/${task.id}`,

                {

                    method:"DELETE"

                }

            );


        });



        setTimeout(() => {


            getTasks();


        }, 500);


    };







    return (

        <div className="todo-container">


            <h1>
                My Todo List
            </h1>





            <input

                className="task-input"

                placeholder="What needs to be done?"

                value={newTask}

                onChange={(e)=>setNewTask(e.target.value)}

                onKeyDown={addTask}

            />





            <ul>


                {tasks.map(task => (


                    <Todo

                        key={task.id}

                        task={task}

                        deleteTask={deleteTask}

                    />


                ))}


            </ul>





            <button

                className="clear-btn"

                onClick={clearAll}

            >

                Clear All Tasks

            </button>




        </div>

    );


};


export default Home;