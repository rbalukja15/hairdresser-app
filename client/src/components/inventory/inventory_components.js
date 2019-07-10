import React from "react";

import Inventory from "./Inventory";
//import InventoryModal from "../modals/inventoryModal";

import { Container } from "reactstrap";

const containerStyle = {
  marginTop: '40px'
}

const inventory_component = () => {
  return (
    <Container style={containerStyle}>
      {/* <CategoryModal /> */}
      <Inventory />
    </Container>
  );
};

export default inventory_component;
