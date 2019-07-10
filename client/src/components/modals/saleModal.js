import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import { connect } from "react-redux"; //To connect react and redux
import { addSale } from "../../actions/saleActions"; //Import the action to add the sale
import PropTypes from "prop-types";

class SaleModal extends Component {

  //Define the states
  state = {
    modal: false, //Determine the state of the modal
    clientName: "", //The state of the name of inputs
    clientSurname: "",
    productName: "",
    sasia: "",
    cmimi: "",
    kodi: "",
    hasError: false

  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  }

  //Toggle the modal function
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  //Set the state of name when the input event is fired off
  onChange = e => {
    //console.log(e.target)
    //We can add multiple input changes here
    //console.log(this.state.clientName);
    //console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value
    });
    
  };

  //Add the sale
  onSubmit = e => {
    e.preventDefault(); //To prevent the form from submitting naturally

    //Define the new sale
    //console.log(e.target)
    const newSale = {
      clientName: this.state.clientName,
      clientSurname: this.state.clientSurname,
      productName: this.state.productName,
      sasia: this.state.sasia,
      cmimi: this.state.cmimi,
      kodi: this.state.kodi
    };

    //Add Item via addSale Action
    this.props.addSale(newSale);

    //Close the modal
    this.toggle();
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    else {
      return (
        <div>
          {this.props.isAuthenticated ? (
            <Button
              color="success"
              outline
              style={{ marginBottom: "2rem" }}
              onClick={ this.toggle.bind(this) }
            >
              Shto Shitje
            </Button>
          ) : (
            <h4 className="mb-3 ml-4">Please log in to add sale</h4>
          )}
  
          <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
            <ModalHeader toggle={this.toggle}>Shto shitje te re</ModalHeader>
            <ModalBody>
              <Form onSubmit={ this.onSubmit }>
                <FormGroup>
                  <Label for="clientName">Emer</Label>
                  <Input
                    type="text"
                    name="clientName"
                    id="clientName"
                    placeholder="Emer..."
                    onChange={this.onChange}
                    className="mb-2"
                  />
                  <Label for="clientSurname">Mbiemer</Label>
                  <Input
                    type="text"
                    name="clientSurname"
                    id="clientSurname"
                    placeholder="Mbiemer..."
                    onChange={this.onChange}
                    className="mb-2"
                  />
                  <Label for="productName">Emri Produktit</Label>
                  <Input
                    type="text"
                    name="productName"
                    id="productName"
                    placeholder="Emer Produkti..."
                    onChange={this.onChange}
                    className="mb-2"
                  />
                  <Label for="sasia">Sasia</Label>
                  <Input
                    type="number"
                    name="sasia"
                    id="sasia"
                    placeholder="Sasia..."
                    onChange={this.onChange}
                    className="mb-2"
                  />
                  <Label for="cmimi">Cmimi</Label>
                  <Input
                    type="number"
                    name="cmimi"
                    id="cmimi"
                    placeholder="Cmimi..."
                    onChange={this.onChange}
                    className="mb-2"
                  />
                  <Label for="kodi">Kodi</Label>
                  <Input
                    type="text"
                    name="kodi"
                    id="kodi"
                    placeholder="kodi..."
                    onChange={this.onChange}
                    className="mb-2"
                  />
                  <Button color="info" outline style={{ marginTop: "2rem" }} block>
                    Shto shitje
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
    
  }
}

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = state => ({
  sale: state.sale,
  isAuthenticated: state.auth.isAuthenticated
});

//Connect takes as parameters the action and our mapping function
export default connect(
  mapStateToProps,
  { addSale }
)(SaleModal); //Because we are using connect
