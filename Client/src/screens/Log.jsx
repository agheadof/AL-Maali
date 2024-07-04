import React , { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Task from '../components/Task'
import Alert from 'react-bootstrap/Alert'
import axios from './../axios/axios'

const Log = () => {

    const [log, setLog] = useState([])
    const [alert, setAlert] = useState(false)



    useEffect(() => {
        const token = localStorage.getItem('token')
        // const token = ' 1'

        if (token) {
        const getMyTasks = async () => {
                const res = await axios.get('/get_my_tasks/' ,{headers:{'auth-token':token}})
    
                if (res.data !== "Forbidden") {
                    setAlert(false)
                    setLog(res.data)
                }
                else {

                    setAlert(true)
                    setLog(null)
                    
                }
                
            }
            getMyTasks()
        }
        else window.location.href = '/'
        
    }, [])
    
    
  return (
    <Container className='justify-content-center m-5 p-2'>
    <h1 className='text-center'>Work Log</h1>
    <hr />
    {alert ? <Alert variant='danger'> Wrong authintication header !! Please <Alert.Link href="/">Return to Login</Alert.Link> </Alert> : null}

    <Row>

        {
            Array.isArray(log) ? log.map(task => {
                return <Col md={8} lg={12} sm={12} key={task.id} style={{ width: '18rem' }}>
                    <Task task={task} />
                </Col>
            }) : null
        }
    </Row>
</Container>
  )
}

export default Log
