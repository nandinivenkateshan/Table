const pool = require('./config')
const bcrypt = require('bcrypt')

// User Details

const createAcc = async (req, res) => {
  const { username, email, pswd } = req.body
  const hashedPswd = await bcrypt.hash(pswd, 10)
  if (!username || !email || !pswd) {
    res.send('Please Enter the details')
  }
  if (!/^[a-z0-9A-Z ]+$/.test(username)) {
    res.send('User Name is Invalid')
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    res.send('Email address is invalid')
  }
  try {
    await pool.query('INSERT INTO signup (username, email, pswd) VALUES ($1,$2,$3)', [username, email, hashedPswd])
    res.send('Added user details successfully')
  } catch {
    res.send('Email already exist')
  }
}

const getUser = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM signup')
    res.status(200).json(response.rows)
  } catch {
    res.send('Error in fetching user')
  }
}

const login = async (req, res) => {
  let result
  const { email, pswd } = req.body
  if (!email || !pswd) {
    res.send('Please Enter the details')
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    res.send('Email address is invalid')
  }
  try {
    result = await pool.query('SELECT * FROM signup WHERE email=$1', [email])
  } catch (e) {
    return 'Unable to fetch user details'
  }
  if (result.rows.length === 0) {
    res.send('No User with this Email')
  }
  if (!(await bcrypt.compare(pswd, result.rows[0].pswd))) {
    res.send('Password is incorrect')
  }
}

// CRUD Operation
const getData = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM bankdetails')
    res.status(200).json(response.rows)
  } catch {
    res.send('Error in fetching bank details')
  }
}

const insertData = async (req, res) => {
  const { name, age, salary } = req.body
  try {
    const response = pool.query('INSERT INTO bankdetails (name,age,salary) VALUES ($1,$2,$3)', [name, age, salary])
    const result = await response
    console.log('result', result)
  } catch {
    res.send('Error while inserting details')
  }
}

const editName = async (req, res) => {
  const { name, id } = req.body
  try {
    const response = await pool.query('UPDATE bankdetails SET name=$1 WHERE id=$2', [name, id])
    res.send(`updated ${response.rowCount} successfully`)
  } catch {
    res.send('Error in updating name')
  }
}

const deleteRow = async (req, res) => {
  const { id } = req.body
  try {
    const response = await pool.query('DELETE FROM bankdetails WHERE id=$1', [id])
    res.send(`Deleted  ${response.rowCount} row successfully`)
  } catch {
    res.send('Error while deleting row')
  }
}

module.exports = {
  getData,
  insertData,
  editName,
  deleteRow,
  getUser,
  createAcc,
  login
}
