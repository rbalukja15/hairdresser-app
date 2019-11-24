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
import { addCategory } from "../../../actions/categoryActions"; //Import the action to add the item
import PropTypes from "prop-types";

//Toastr Part
import { toastr } from "react-redux-toastr"; //Toastr for validation notifications
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"; //CSS for toastr

class CategoryModal extends Component {
  //Define the states
  state = {
    modal: false, //Determine the state of the modal
    name: "" //The state of the name of inputs
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  //Toggle the modal function
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  //Set the state of name when the input event is fired off
  onChange = e => {
    //We can add multiple input changes here
    this.setState({ [e.target.name]: e.target.value });
  };

  //Add the item
  onSubmit = e => {
    e.preventDefault(); //To prevent the form from submitting naturally

    //Define the new item
    const newCategory = {
      name: this.state.name
    };

    //Add Item via addItem Action
    this.props.addCategory(newCategory);

    if(this.state.name === "")
      {
        toastr.error('Shtim', 'Kategoria duhet te kete emer');
        return;
      }
    else {
      toastr.success('Shtim', 'Kategoria u shtua me sukses');

      //Close the modal
      this.toggle();
    }

  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="success"
            outline
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle.bind(this) }
          >
            Shto Kategori
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Ju lutem logohuni qe te shtoni kategori</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
          <ModalHeader toggle={this.toggle} className="bg-light">Shto te kategorite</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="category">Kategori</Label>
                <Input
                  type="text"
                  name="name"
                  id="category"
                  placeholder="Shto kategori"
                  onChange={this.onChange}
                />
                  <Button color="info" outline style={{ marginTop: "2rem" }} block>
                    Shto Kategori
                  </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = state => ({
  category: state.category,
  isAuthenticated: state.auth.isAuthenticated
});

//Connect takes as parameters the action and our mapping function
export default connect(
  mapStateToProps,
  { addCategory }
)(CategoryModal); //Because we are using connect
