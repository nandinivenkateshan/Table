const express = require('express')
const db = require('./query')
const app = express()
const port = 3000
app.use(express.json())

// User Details
app.post('/createAcc', db.createAcc)
app.get('/getUser', db.getUser)
app.post('/login', db.login)

// CRUD operation
app.get('/getData', db.getData)
app.post('/insertData', db.insertData)
app.patch('/editName', db.editName)
app.delete('/deleteRow', db.deleteRow)

app.listen(port, () => console.log(`App running on the port ${port}`))
