import React from 'react';

import Sale from './Sale';

import { Container } from 'reactstrap';

const containerStyle = {
    marginTop: '40px',
};

const sale_component = () => {
    return (
        <Container style={containerStyle}>
            <Sale />
        </Container>
    );
};

export default sale_component;
