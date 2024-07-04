import Button from 'react-bootstrap/Button'
import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


const DETask = ({ task }) => {

    let variant = ''
    let taskState = ''


    switch (task.state) {
        case 0: variant = 'light'
            taskState = 'Available'
            break
        case 1: variant = 'info'
            taskState = 'Taken'
            break

        case 2: variant = 'success'
            taskState = 'In Review'

            break
        case 3: variant = 'warning'
            taskState = 'Needs Modifying'

            break
        case 4: variant = 'dark'
            taskState = 'Done '

            break
        default: variant = null

    }

    return (
        <>

            <Card className='shadow m-2 p-2 '
                bg={variant}
                key={variant}
                text={variant === 'success'||variant === 'dark' ? 'white' : 'dark'}
            >
                <Card.Header >

                    <Card.Title>Title: {task.title}</Card.Title>

                </Card.Header>
                <Card.Body >
                    <Card.Subtitle className='m-1'>Client Name: {task.client}</Card.Subtitle>
                    <Card.Subtitle className='m-1'>Price: {task.price} SP</Card.Subtitle>
                    <Card.Subtitle className='m-1'>Task Status: {taskState}</Card.Subtitle>

                    <Link to={`/managetask/${task.id}`}>
                        <Button className='m-1' variant={variant === 'dark' || variant === 'success' ? 'outline-light' : 'outline-dark'}>
                            Manage Task
                        </Button>
                    </Link>
                </Card.Body>
                <Card.Footer > Since: {task.createdAt}</Card.Footer>
            </Card>

        </>
    )
}

export default DETask