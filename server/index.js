const express = require('express')
const db = require('./query')
const app = express()
const cors = require('cors')
const port = 3000
app.use(express.json())
app.use(cors())

// User Details
app.post('/createAcc', db.createAcc)
app.get('/getUser', db.getUser)
app.post('/login', db.login)
app.post('/forgotPswd', db.forgotPswd)
app.put('/resetPswd', db.resetPswd)

// CRUD operation
app.get('/getData', db.getData)
app.post('/insertData', db.insertData)
app.put('/editDetail', db.editDetail)
app.delete('/deleteRow', db.deleteRow)

app.listen(port, () => console.log(`App running on the port ${port}`))
