/* eslint-disable react/prop-types */
import './style.css'

export const Task = ({id, title, description, handleEdit , handleDelete}) => {
  return (
    <section className='card' key={id}>
      <div className='contain'>
        <h1 className="card-title">{title}</h1>
        <p className="card-description">{description}</p>
      </div>
      <div className='container-btn'>
        <button 
          className='btn-edit'
          onClick={handleEdit}
        >
          Edit
        </button>
        <button 
          className='btn-delete'
          type='button'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </section>
  )
}
