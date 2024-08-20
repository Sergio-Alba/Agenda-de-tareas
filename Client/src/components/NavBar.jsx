import { Link, useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
export const NavBar = ({title, btnName}) => {
  const navigate = useNavigate()
  return (
    <header className="header">
      <Link to="/">
        {title}
      </Link>
      <button className="btn-new-Task" type="" onClick={()=>navigate('/task/new')}>{btnName}</button>
    </header>
  )
}
