import React from "react";

import ClientList from "./ClientList";
import ClientModal from "../modals/client/clientModel";

import { Container } from "reactstrap";

const containerStyle = {
  marginTop: '40px'
}

const client_component = () => {
  return (
    <Container style={containerStyle}>
      <ClientModal />
      <ClientList />
    </Container>
  );
};

export default client_component;
