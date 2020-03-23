const pool = require('./config')

const getData = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM bankdetails')
    res.status(200).json(response.rows)
  } catch {
    res.send('Error in fetching all details')
  }
}

const insertData = async (req, res) => {
  const { name, age, salary } = req.body
  try {
    const response = pool.query('INSERT INTO bankdetails (name,age,salary) VALUES ($1,$2,$3)', [name, age, salary])
    const result = await response
    console.log('result', result)
  } catch {
    console.log('rerer')
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
  deleteRow
}
