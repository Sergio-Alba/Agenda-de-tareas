const pool = require('../db')

const createTask = async (req, res, next) => {
  try{
    const {title, description} = req.body
    const result = await pool.query(`
      INSERT INTO task (title,description) 
      VALUES ($1,$2) RETURNING *`,
      [title, description]
    )
    res.json(result.rows[0])
  }catch(e){
    next(e)
  }
}

const getAllTasks = async (req,res, next) => {
  try{
    const allTasks = await pool.query('SELECT * FROM task')
    res.json(allTasks.rows)
  }catch(e){
    next(e)
  }
}

const getTask = async (req, res, next) => {
  try{
    const { id } = req.params
    const result = await pool.query('SELECT * FROM task WHERE id = $1',[id])
    if(result.rows.length === 0 ) return res.status(404).json({message:"Task no found"})
    return res.json(result.rows)
  }catch(e){
    next(e)
  }
}

const deleteTask = async (req, res, next) => {
  try{
    const { id } = req.params
    const result =  await pool.query('DELETE FROM task WHERE id = $1 RETURNING *',[id])
    if(result.rowCount === 0)
      return res.status(404),json({
        message: "Task not found"
      })
    res.sendStatus(204)
  }catch(e){
    next(e)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description } = req.body
    const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',[title, description, id])
    if(result.rows.length === 0 )
      return res.status(404).json({
        message:"Task not found"
      })
  res.json(result.rows[0])
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
}