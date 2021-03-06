import React from "react";
import BuyingModal from "../modals/buying/buyingModal";

import { Container } from "reactstrap";
import Buying from "./Buying";
import InvoiceModal from "../invoice/Invoice";

const containerStyle = {
  marginTop: '40px'
};

const sale_component = () => {
  return (
    <Container style={containerStyle}>
      <Buying />
    </Container>
  );
};

export default sale_component;