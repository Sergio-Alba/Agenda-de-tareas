import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "./loader"

export const FormTask = () => {

  const [task , setTask] = useState({
    title:'',
    description:'',
  })
  const [loader, setLoader] = useState(false)
  const [edit, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)

    if(edit){
      await fetch(`http://localhost:3000/tasks/${params.id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
      })
    }else{
      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { "Content-Type":"application/json"}
      })
    }

    setLoader(false)
    navigate('/')
  }
  
  const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value})
  }
  
  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json()
    setTask({title: data[0].title, description: data[0].description})
    setEditing(true)
  }

  useEffect( ()=>{
    if(params.id){
      loadTask(params.id)
    }
  },[params.id])
  return (
    <div className="container-form">
      <form action="" method="post" onSubmit={handleSubmit}>
      <h1>{edit? 'Editing Task': 'Create Task'}</h1>
        <div className="container-input">
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            name="title"
            value={task.title}
            type="text" 
            onChange={handleChange} 
          />
        </div>
        <div className="container-input">
          <label htmlFor="description">Description</label>
          <textarea 
            name="description" 
            id="description"
            value={task.description}
            onChange={handleChange}
          >
          </textarea>
        </div>
        <button 
          className="btn-new-Task" 
          type="submit"
          disabled={!task.title || !task.description}
        >
            {loader ? <Loader /> : 'Save'}
        </button>
      </form>
    </div>
  )
}
