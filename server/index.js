const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
//middleware

app.use(cors())

//anytime you are building a full stack app you have to get it from the client 
//side, meaning that it has to come from the request.body object and will be .json()
//Gives us access to express.json(), but using this we are able to use req.body
app.use(express.json()) //req.body


//Routes

//create a todo (use post to add data)
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    //$1 is a placeholder that is defined in the the next arg, here it is description
    //response is a json object that return the first item in that array
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message)
  }
})
//get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows)
  } catch (error) {
    console.log(error.message)
  }
})
//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])

    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message)
  }
})
//update a todo 

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
    [description, id]
    )

    res.json("todo  was udated")
  } catch (error) {
    console.log(error.message)
  }
})
//delete a todo

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
    res.json("todo was deleted")
  } catch (error) {
    
  }
})

app.listen(3001, () => {
  console.log('Server has started on port 3001')
})