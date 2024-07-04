import React, { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import jwt from 'jwt-decode'
import axios from './../axios/axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const token = localStorage.getItem('token')


let data = null
let full_name = null



const NavType = () => {

  const [logged, setLogged] = useState('out')
  const [accountType, setAccountType] = useState('N')
  const [balance , setBalance] = useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const logout = () => {
    localStorage.clear()
    window.location.href = "/"
    setAccountType('N')
  }

  useEffect(() => {
    if (token) {
      setLogged('in')
      
    }
    else setLogged('out')
  }, [])


  useEffect(() => {
    if (token) {
      if (data.Admin == false) {
        setAccountType('D')
      }
      else if (data.Admin === true) {
        setAccountType('A')
      }
      else if (data.Admin == null) {
        setAccountType('W')
        const getBalance = async () => {

          const res = await axios.get('/writer_balance/', { headers: { 'auth-token': token } })
  
          if (res.data !== "Forbidden") {
              setBalance(res.data[0].balance)
          }
          else {
              setBalance(null)
          }
  
      }
      getBalance()
      }
    }

  }, [])

  if (token) {

    data = jwt(token)
    full_name = data.full_name
  }

  if (accountType == 'W') {
    return (
      <>
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link as={Link} to="/dashboard">HOME</Nav.Link>
          <Nav.Link as={Link} to="/log">WORK LOG</Nav.Link>
          <Nav.Link as={Link} onClick={handleShow}>LOGOUT</Nav.Link>
        </Nav>
        <Navbar.Text className="me-5 justify-content-end" hidden={logged == 'out'}>
          Loged in as :
          <div className='text-warning'>
            {full_name}
          </div>
        </Navbar.Text>
        <Navbar.Text className="me-5 justify-content-end" hidden={logged == 'out'}>
          Balance:
          <div className='text-success'>
            {balance}
          </div>
        </Navbar.Text>
      </Navbar.Collapse>
      <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Logging out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to log out !!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={logout}>Logout</Button>
      </Modal.Footer>
    </Modal>
      </>
    )
  }
  else if (accountType == 'D') {
    return (
      <>
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link as={Link} to="/taskmanagement">TASK MANAGEMENT</Nav.Link>
          <Nav.Link as={Link} to="/dedashboard">TASKS IN REVIEW</Nav.Link>
          <Nav.Link as={Link} onClick={handleShow}>LOGOUT</Nav.Link>
        </Nav>
        <Navbar.Text className="me-5 justify-content-end" hidden={logged == 'out'}>
          Loged in as :
          <div className='text-warning'>
            {full_name}
          </div>
        </Navbar.Text>

      </Navbar.Collapse>
      <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Logging out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to log out !!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={logout}>Logout</Button>
      </Modal.Footer>
    </Modal>
      </>
    )
  }
  else if (accountType == 'A') {
    return (
      <>
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link as={Link} to="/taskmanagement">TASK MANAGEMENT</Nav.Link>
          <Nav.Link as={Link} to="/dedashboard">TASKS IN REVIEW</Nav.Link>
          <Nav.Link as={Link} to="/manageacc">ACCOUNT MANAGEMENT</Nav.Link>
          <Nav.Link as={Link} onClick={handleShow}>LOGOUT</Nav.Link>

        </Nav>
        <Navbar.Text className="me-5 justify-content-end" hidden={logged == 'out'}>
          Loged in as :
          <div className='text-warning'>
            {full_name}
          </div>
        </Navbar.Text>

      </Navbar.Collapse>
      <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Logging out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to log out !!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={logout}>Logout</Button>
      </Modal.Footer>
    </Modal>
    </>
    )
  }
  else return
}

export default NavType
