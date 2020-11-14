import React from 'react'

import ShoppingList from './ShoppingList'
import ItemModal from '../modals/Item/ItemModel'

import { Container } from 'reactstrap'

const containerStyle = {
    marginTop: '40px',
}

const itemShopping = () => {
    return (
        <Container style={containerStyle}>
            <ItemModal />
            <div style={containerStyle}>
                <ShoppingList />
            </div>
        </Container>
    )
}

export default itemShopping
