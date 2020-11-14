import React from 'react'

import Employee from './Employee'
import EmployeeModal from '../modals/employee/addEmployeeModal'

import { Container } from 'reactstrap'

const containerStyle = {
    marginTop: '10px',
}

const employee = () => {
    return (
        <Container style={containerStyle}>
            <EmployeeModal />
            <div style={containerStyle}>
                <Employee />
            </div>
        </Container>
    )
}

export default employee
