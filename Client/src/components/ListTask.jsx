import { useEffect, useState } from "react";
import { Task } from "./task/Task";
import { useNavigate } from "react-router-dom";

export const ListTask = () => {
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()
  
  const loadTasks = async () => {
    const res =  await fetch('http://localhost:3000/tasks')
    const data = await res.json()
    setTasks(data)
    console.log(data)
  }
  
  const deleteTask = async (id) =>{
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
      })
      setTasks(tasks.filter( (task) => task.id !== id))
    }catch (error) {
      console.log(error)
    }
  } 
  useEffect(() =>{
    loadTasks()
  },[])
  return (
    <section className="container-task">
      {
        tasks.map(task =>(
          <Task 
            key={task.id} 
            title={task.title} 
            description={task.description} 
            handleDelete={() => deleteTask(task.id)} 
            handleEdit={() => navigate(`/tasks/${task.id}/edit`)} 
          />
        ))
      }
    </section>
  )
}
