import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { FormTask } from './components/FormTask'
import './App.css'
import { ListTask } from './components/ListTask'

function App() {
  return (
    <BrowserRouter>
      <NavBar title="Tasks" btnName="New Task" />
      <Routes>
        <Route path='/' element={<ListTask/>} />
        <Route path='/task/new' element={<FormTask />} />
        <Route path='/tasks/:id/edit' element={<FormTask />} />
      </Routes>
    </BrowserRouter>
    
  )
}
export default App
