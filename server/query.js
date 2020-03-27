const pool = require('./config')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

// User Details

const createAcc = async (req, res) => {
  const { username, email, password } = req.body
  console.log('req.body', req.body)
  const hashedPswd = await bcrypt.hash(password, 10)
  if (!username || !email || !password) {
    res.send({ response: 'Please Enter the details' })
  }
  if (!/^[a-z0-9A-Z ]+$/.test(username)) {
    res.send({ response: 'User Name is Invalid' })
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    res.send({ response: 'Email address is invalid' })
  }
  try {
    await pool.query('INSERT INTO signup (username, email, password) VALUES ($1,$2,$3)', [username, email, hashedPswd])
    res.send({
      res: 'Added user details successfully'
    })
  } catch {
    res.send({ response: 'Email already exist' })
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
  } catch {
    res.send('Unable to fetch user details')
  }
  if (result.rows.length === 0) {
    res.send('No User with this Email')
  }
  if (!(await bcrypt.compare(pswd, result.rows[0].password))) {
    res.send('Password is incorrect')
  }
}

const forgotPswd = async (req, res) => {
  const { email } = req.body
  let result
  if (!email) {
    res.send('Please Enter the details')
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    res.send('Email address is invalid')
  }

  try {
    result = await pool.query('SELECT * FROM signup WHERE email=$1', [email])
  } catch {
    res.send('unable to fetch user details')
  }
  if (result.rows.length === 0) {
    res.send('No User with this Email')
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const mailOptions = {
    from: '',
    to: 'nandinivsa@gmail.com',
    subject: 'Link to reset password',
    text:
    `please click the link below to reset your password.
     If this was not you, it is safe to ignore this email.
     http://localhost:3000/resetPswd
    `
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('result', result)
    res.send('Email sent')
  } catch (e) {
    console.log('error', e)
    res.send('Error while sending email')
  }
}

const resetPswd = async (req, res) => {
  console.log('resetPswd')
  const { email, password } = req.body
  try {
    const response = await pool.query('UPDATE signup SET password=$2 WHERE email=$1', [email, password])
    res.send('Password updated successfully')
  } catch {
    res.send('Error in updating password')
  }
}

// CRUD Operation
const getData = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM bankdetails')
    res.status(200).send(response.rows)
  } catch {
    res.send('Error in fetching bank details')
  }
}

const insertData = async (req, res) => {
  const { id, name, age, salary } = req.body
  try {
    const response = pool.query('INSERT INTO bankdetails (id,name,age,salary) VALUES ($1,$2,$3,$4)', [id, name, age, salary])
    const result = await response
    res.send('Added data successfully')
    console.log('result', result)
  } catch {
    res.send('Error while inserting details')
  }
}

const editDetail = async (req, res) => {
  const { id, value, data } = req.body
  try {
    const response = await pool.query(`UPDATE bankdetails SET ${data}=$1 WHERE id=$2`, [value, id])
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
  editDetail,
  deleteRow,
  getUser,
  createAcc,
  login,
  forgotPswd,
  resetPswd
}