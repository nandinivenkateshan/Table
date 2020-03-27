import React from 'react'
import styled from 'styled-components'

const Heading = styled.h1`
margin-top: 50px;
text-align: center;
`
const Form = styled.form`
border: 1px solid grey;
display: grid;
grid-template-columns: 150px 300px;
grid-row-gap: 20px;
padding: 20px;
width: 500px;
margin:100px auto;
`
const Button = styled.button`
grid-area: 4/1/5/3;
width: 100px;
margin:auto;
color: #388f38;
border: none;
padding: 10px;
border-radius: 30px;
font-weight: bold;
background-color: #ddcfcf;
box-shadow: 3px 2px grey;
`
const Input = styled.input`
padding: 10px;
border-radius: 50px; 
border: 1px solid grey;
`
const Response = styled.p`
color: red;
grid-area: 5/1/6/3;
margin: auto;

`
function Login () {
  return (
    <main>
      <header>
        <Heading>Login</Heading>
      </header>
      <section>
        <Form>
          <label htmlFor='email'>Email :</label>
          <Input
            type='email'
            placeholder='Enter your email'
            name='email' id='email'
            required
           
          />
          <label htmlFor='pswd'>Password :</label>
          <Input
            type='password'
            placeholder='Enter Password'
            name='pswd' id='pswd'
            required
         
          />
          <Button>Submit</Button>
        </Form>
      </section>

    </main>
  )
}
export default Login
