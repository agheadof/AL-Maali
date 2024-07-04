import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import React, { useState, useEffect } from "react";
import axios from "./../axios/axios";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)



  const LoginWriter = (event) => {
    event.preventDefault()

    axios.post('/writer_auth/', { email, password })
      .then(res => {
        const token = res.data
        if (token) {

          setAlert(false)
          localStorage.setItem('token', token)
          window.location.href = '/dashboard'

        }
        else setAlert(true)

      })
      .catch(error => {
        if (error.response.status === 400) setAlert2(true)
      })

  }


  return (
    <Container>
      <h1 className="text-primary">Login As Writer</h1>
      <hr />
      {alert2 ? <Alert variant='danger'> Please Enter A Valid Email, Password Combination </Alert> : null}

      <Form onSubmit={LoginWriter}>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="m-1">
        Don't you have an account?
        <Link to={'/Register'} className="ms-1">Register </Link>
      </div>
      <hr />
      {alert ? <Alert variant='danger'> Something went wrong please return to login page </Alert> : null}
    </Container>
  );
}
export default Login