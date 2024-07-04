import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import DETask from './DETask'
import Alert from 'react-bootstrap/Alert'
import axios from './../axios/axios'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const DEDashboard = () => {
    const [allTasks, setAllTasks] = useState([])
  const [searchData, setSearchData] = useState([])

    const [alert, setAlert] = useState(false)

    const token = localStorage.getItem('token')
    axios.defaults.headers.common['auth-token'] = token


    useEffect(() => {


        if (token) {
            const getMyTasks = async () => {
                const res = await axios.get('/get_tasks_in_review/')
                if (res.data !== "Forbidden") {
                    setAlert(false)
                    setAllTasks(res.data)
          setSearchData(res.data)

                }
                else {

                    setAlert(true)
                    setAllTasks(null)
                    setSearchData(null)

                }

            }
            getMyTasks()
        }
        else window.location.href = '/'

    }, [])
    const [filter, setFilter] = useState([])

    const handleFilter = (e) => {
      const searchWord = e.target.value;
      console.log(searchWord)
      if (searchWord === '') {
        setAllTasks(searchData)
      }
      else {
        const newFilter = searchData.filter((value) => value.client.toLowerCase().includes(searchWord.toLowerCase()))
        setAllTasks(newFilter)
      }
      setFilter(searchWord)
    }

    return (
        <Container className='justify-content-center m-5 p-2'>
            <h1 className='text-center'>Tasks Waiting for review</h1>
            <hr />
            {alert ? <Alert variant='danger'> Wrong authintication header !! Please <Alert.Link href="/">Return to Log</Alert.Link> </Alert> : null}
            <Form className="d-flex justify-content-start" >
        <FloatingLabel
          className="me-2 w-50"
          controlId="floatingInput"
          label="Search By Client Name"
        >
          <Form.Control
            type="search"
            placeholder="Search by client"
            value={filter}
            onInput={(e) => handleFilter(e)}

            aria-label="Search"
          />
        </FloatingLabel>
      </Form>
            <Row>

                {
                    Array.isArray(allTasks) ? allTasks.map(task => {
                        return <Col md={8} lg={12} sm={12} key={task.id} style={{ width: '18rem' }}>
                            <DETask task={task} />
                        </Col>
                    }) : null
                }
            </Row>
        </Container>
    )
}

export default DEDashboard