import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import NavType from './components/NavType'
import Container from 'react-bootstrap/Container'
import ManageTask from './DataEntryScreens/ManageTask'
import DEDashboard from './DataEntryScreens/DEDashboard'
import Login from './screens/Login'
import Log from './screens/Log'
import Register from './screens/Register'
import TaskDetails from './screens/TaskDetails'
import Dashboard from './screens/Dashboard'
import AccountType from './screens/AccountType'
import TaskManagement from './DataEntryScreens/TaskManagement'
import ManageAcc from './DataEntryScreens/ManageAcc'
import GenHistory from './DataEntryScreens/GenHistory'
// import EditTask from './DataEntryScreens/EditTask'




const App = () => {

  return (

    <Router>
      <>

<Navbar sticky='top' bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">AL-MAALI</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <NavType/>
        
      </Container>
    </Navbar>
      </>
      <div>
      <Routes>
      <Route exact path='/' element={<AccountType/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/log' element={<Log/>} />
        <Route exact path='/dashboard' element={<Dashboard/>} />
        <Route exact path='/dedashboard' element={<DEDashboard/>} />
        <Route exact path='/managetask/:taskId' element={<ManageTask/>} />
        {/* <Route exact path='/edittask/:taskId' element={<EditTask/>} /> */}
        <Route exact path='/task/:taskId' element={<TaskDetails/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/manageacc' element={<ManageAcc/>} />
        <Route exact path='/taskmanagement' element={<TaskManagement/>} />
        <Route exact path='/genhistory/:writerId' element={<GenHistory/>} />

      </Routes>
      </div>
    </Router>

  )
}

export default App