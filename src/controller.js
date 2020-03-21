const fs = require("fs")
const {
  asyncReadFile,
  asyncWriteFile
} = require('./dao')

exports.getTask = async (req, res) => { 
  const id = Number(req.params.id)
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const tasks = JSON.parse(file).filter(v => v.id === id)
  tasks.length == 0 ? res.status(404).send(url) : res.send(tasks[0])
}

exports.getAllTasks = (req, res) => fs.readFile(req.app.locals.dataFilePath, "utf-8", (err, data) => {
  if (err) {
    return res.status(500).send()
  }
  res.send(JSON.parse(data))
})


