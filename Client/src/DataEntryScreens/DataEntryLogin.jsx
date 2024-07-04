import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import React, { useState, useEffect } from "react";
import axios from "./../axios/axios";
import { Link } from "react-router-dom";

const DataEntryLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)



  const LoginDE = async (event) => {
    event.preventDefault()

    axios.post('/dataentry_auth/', { email, password })
      .then(res => {
        const token = res.data
        if (token) {

          setAlert(false)
          localStorage.setItem('token', token)
          window.location.href = '/dedashboard'

        }
        else setAlert(true)

      })
      .catch(error => {
        if (error.response.status === 400) setAlert2(true)
      })

  }

  return (
    <Container>
      <h1>Login As Data Entry</h1>
      <hr />
      {alert2 ? <Alert variant='danger'> Please Enter A Valid Email, Password Combination </Alert> : null}

      <Form onSubmit={LoginDE}>

        <Form.Group className="mb-3" controlId="demail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dpassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>

      <hr />
      {alert ? <Alert variant='danger'>Something went wrong please return to login page </Alert> : null}
    </Container>
  )
}

export default DataEntryLogin