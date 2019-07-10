import React from "react";

import Category from "./Category";
import CategoryModal from "../modals/categoryModal";

import { Container } from "reactstrap";

const containerStyle = {
  marginTop: '40px'
}

const category_component = () => {
  return (
    <Container style={containerStyle}>
      <CategoryModal />
      <Category />
    </Container>
  );
};

export default category_component;
