import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container'
import Login from './Login'
import DataEntryLogin from '../DataEntryScreens/DataEntryLogin';




const AccountType = () => {

    return (<>

        <Container className='mt-5'>
            <Tabs variant='pills'
                defaultActiveKey='writer'
                id="loging_in"
                className="mb-3"
                justify
            >
                <Tab eventKey="writer" title="Writer">
            
                    <Login />
                </Tab>

                <Tab eventKey="DE" title="Data Entry">
        

                    <DataEntryLogin />
                </Tab>

            </Tabs>
        </Container>
    </>
    )
}

export default AccountType