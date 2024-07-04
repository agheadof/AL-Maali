import React from 'react'
import AddingTask from './AddingTask'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container'
import DELog from './DELog';

const TaskManagement = () => {
  return (
    <Container className='mt-5 lg-col-8 md-col-8 sm-col-12'>
            <Tabs variant='pills'
                defaultActiveKey="add"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="add" title="Create Task">
                <AddingTask/>
                </Tab>
               
                <Tab  eventKey="viewAll" title="Tasks Log" >
                <DELog/>
                </Tab>

            </Tabs>
        </Container>
  )
}

export default TaskManagement