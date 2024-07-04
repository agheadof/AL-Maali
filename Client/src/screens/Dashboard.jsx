import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Task from '../components/Task'
import Alert from 'react-bootstrap/Alert'
import axios from './../axios/axios'




const Dashboard = () => {

    const [allTasks, setAllTasks] = useState([])
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        // const token = ' 1'

        if (token) {
            const getAvailableTasks = async () => {

                const res = await axios.get('/get_available_tasks/', { headers: { 'auth-token': token } })


                if (res.data !== "Forbidden") {
                    setAlert(false)
                    setAllTasks(res.data)
                }
                else {

                    setAlert(true)
                    setAllTasks(null)

                }

            }
            getAvailableTasks()
        }
        else window.location.href = '/'

    }, [])




    return (
        <>

            <Container className=' mt-5 lg-col-8 md-col-8 sm-col-12'>
                <h1 className='text-center'> All Tasks Available</h1>
                <hr />
               

                {alert ? <Alert variant='danger'> Wrong authintication header !! Please <Alert.Link href="/">Return to Login</Alert.Link> </Alert> : null}

                <Row>

                    {
                        Array.isArray(allTasks) ? allTasks.map(task => {
                            return <Col md={8} lg={12} sm={12} key={task.id} style={{ width: '18rem' }}>
                                <Task task={task} />
                            </Col>
                        }) : null
                    }
                </Row>
            </Container>


        </>
    )
}

export default Dashboard