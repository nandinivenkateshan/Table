import React, { useState, useEffect } from 'react'
import Form from './Form'
import AddTable from './AddTable'

function App () {
  let sid
  const session = JSON.parse(window.localStorage.getItem('session'))

  if (session) sid = session.sid
  const [obj, setObj] = useState({
    name: '',
    age: '',
    salary: ''
  })
  const [details, setDetails] = useState([])

  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = async () => {
    const response = await window.fetch(`http://localhost:5000/getData/?sid=${sid}`)
    const result = await response.json()
    setDetails(result)
  }

  const handleChange = e => {
    e.persist()
    setObj({ ...obj, [e.target.name]: e.target.value })
  }

  const addDetails = async (url, data) => {
    const response = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const deleteDetails = async (url, id) => {
    const response = await window.fetch(url, {
      method: 'Delete',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const editDetail = async (url, data) => {
    console.log('deta', data)
    const response = await window.fetch(url, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('response', response)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const object = {
      id: Date.now(),
      name: obj.name,
      age: obj.age,
      salary: obj.salary
    }
    setDetails([...details, object])
    addDetails('http://localhost:5000/insertData', object)
    setObj({ name: '', age: '', salary: '' })
  }

  const handleDelete = id => {
    setDetails(details.filter(item => item.id !== id))
    deleteDetails('http://localhost:5000/deleteRow', id)
  }

  const handleEdit = (id, data) => {
    const value = window.prompt(`Enter ${data} to update`)
    if (value) {
      const editedDetails = details.map(item => {
        if (item.id === id) {
          item[data] = value
          return item
        }
        return item
      })
      setDetails(editedDetails)
      if (value) editDetail('http://localhost:5000/editDetail', { id, data, value: value })
    }
  }

  return (
    <main>

      <Form
        obj={obj}
        onInput={e => handleChange(e)}
        onSubmit={e => handleSubmit(e)}
      />
      <AddTable
        details={details}
        onDelete={id => handleDelete(id)}
        onEdit={(id, data) => handleEdit(id, data)}
      />
    </main>
  )
}

export default App
