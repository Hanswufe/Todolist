const express = require('express')
const {
  getTask,
  getAllTasks,
} = require('./controller')

const app = express()
app.locals.dataFilePath = "./data.json"

const port = 3000

app.use(express.json())
app.get('/', (req, res) => res.send('<h1>Hi, Welcome!</h1>'))

app.get("/api/tasks/:id", getTask)
app.get("/api/tasks/", getAllTasks)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

exports.app = app
