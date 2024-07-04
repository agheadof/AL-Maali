import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert'
import axios from './../axios/axios'

const DataEntryRegister = () => {
  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [admin, setAdmin] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)




  const registerDE = async (event) => {
    event.preventDefault()

     await axios.post('/dataentry_register/' , {full_name, email, password, phone, admin})
     .then( () => window.location.reload(false))
     .catch(error =>  {
      if (error.response.status === 403 ) setAlert(true)
      else if (error.response.status === 400 ) setAlert2(true)
    })

    
   
  }

  return (
    <Container>
      <h1>Register Data Entry account</h1>
      <hr />
      {alert ? <Alert variant='warning'> Email Already Exist Please Try A New One Or <Alert.Link href="/"> Go To Login </Alert.Link> </Alert> : null}

      {alert2 ? <Alert variant='warning'> Please Fill Up The Form Correctly, And Make Sure your Password is Strong </Alert> : null}

      <Form onSubmit={registerDE}>

        <Form.Group className="mb-3" controlId="dfull_name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={full_name}
            onChange={e => setFullName(e.target.value)}
            type="text"
            placeholder="Enter Your Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="demail">
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

        <Form.Group className="mb-3" controlId="dpassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dphone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            value={phone}
            onChange={e => setPhone(e.target.value)}
            type="text"
            placeholder="Phone number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="isAdmin">
          <Form.Check
            value={!admin}
            onChange={e =>{ console.log(admin)
               setAdmin(!admin)
              }}
            type="checkbox"
            label="Is Admin ?"

          />
        
        </Form.Group>
        
          <Button variant="primary" type="submit" >
            Create
          </Button>
       
      </Form>
    </Container>
  );
}

export default DataEntryRegister