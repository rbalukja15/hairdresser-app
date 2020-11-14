import React from 'react'

import { Container } from 'reactstrap'
import Buying from './Buying'

const containerStyle = {
    marginTop: '40px',
}

const sale_component = () => {
    return (
        <Container style={containerStyle}>
            <Buying />
        </Container>
    )
}

export default sale_component
