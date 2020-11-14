import React from 'react'

import Sale from './Sale'
import SaleModal from '../modals/sale/saleModal'

import { Container } from 'reactstrap'
import InvoiceModal from '../invoice/Invoice'

const containerStyle = {
    marginTop: '40px',
}

const sale_component = () => {
    return (
        <Container style={containerStyle}>
            <Sale />
        </Container>
    )
}

export default sale_component
