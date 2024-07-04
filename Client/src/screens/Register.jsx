import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert'
import axios from './../axios/axios'
import { Link } from "react-router-dom";

function Register() {

  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)




  const registerWriter = async (event) => {
    event.preventDefault()

     await axios.post('/writer_register/' , {full_name, email, password, phone})
     .then( () => window.location.href ='/')
     .catch(error =>  {
      if (error.response.status === 403 ) setAlert(true)
      else if (error.response.status === 400 ) setAlert2(true)
    })

    
   
  }

  return (
    <Container>
      <h1>Register account</h1>
      <hr />
      {alert ? <Alert variant='warning'> Email Already Exist Please Try A New One Or <Alert.Link href="/"> Go To Login </Alert.Link> </Alert> : null}

      {alert2 ? <Alert variant='warning'> Please Fill Up The Form Correctly, And Make Sure your Password is Strong </Alert> : null}

      <Form onSubmit={registerWriter}>

        <Form.Group className="mb-3" controlId="full_name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={full_name}
            onChange={e => setFullName(e.target.value)}
            type="text"
            placeholder="Enter Your Name"
          />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            value={phone}
            onChange={e => setPhone(e.target.value)}
            type="text"
            placeholder="Phone number"
          />
        </Form.Group>
        
          <Button variant="primary" type="submit" >
            Submit
          </Button>
       
      </Form>
      <div>Already have an account ? Go to  <Link to={'/'} className="ms-1"> LOGIN </Link></div>
    </Container>
  );
}
export default Register