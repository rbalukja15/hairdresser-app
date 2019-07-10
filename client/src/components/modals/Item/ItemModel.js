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
import Select from 'react-select';
import { connect } from "react-redux"; //To connect react and redux
import { addItem } from "../../../actions/itemActions"; //Import the action to add the item
import { getCategories } from "../../../actions/categoryActions";//Import the action to call the categories
import PropTypes from "prop-types";

//Material-Ui Part
//import { withStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
//import Fab from "@material-ui/core/Fab";
//import AddIcon from "@material-ui/icons/Add";


//Materia-Ui Design
const styles = theme => ({
  root: {
    justifyContent: "center",
    marginLeft: 10
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  fab: {
    margin: theme.spacing(1),
    justifyContent: "center"
  },
  modal: {
    marginBottom: theme.spacing(2),
    size: "md"
  },
  div: {
    marginLeft: "50%"
  },
});

//Select Part
const select_values = [];


class ItemModal extends Component {
  //Define the states
  state = {
    modal: false, //Determine the state of the modal
    name: "", //The state of the name of inputs
    kodi: "",
    cmimBlerje: 0,
    prodhuesi: "",
    shitesi: "",
    category: "",
  };

  static propTypes = {
    category: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentWillMount() {
    //Runs when the component mounts
    //Here we run actions
    this._refreshCategories();
  }

  //Refresh function for the datas in the table
  _refreshCategories() {
    this.props.getCategories();
  }

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
    const newItem = {
      name: this.state.name,
      kodi: this.state.kodi,
      cmimBlerje: this.state.cmimBlerje,
      prodhuesi: this.state.prodhuesi,
      shitesi: this.state.shitesi,
      category: this.state.category,
    };

    //Add Item via addItem Action
    this.props.addItem(newItem);

    //Close the modal
    this.toggle();
  };

  //Handle select input option
  handleChange = category => {
    this.setState({ category:category.value });
    //console.log(`Option selected:`, category.value);
  };

  render() {
    const { categories } = this.props.category; //Pull the categories
    const { category } = this.state;
    //Load the categories
    categories.map(
      ({_id, name}) => {
        select_values.push({
          label:name, value:name
        });
      }
    );

    //console.log(select_data);

    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle.bind(this)}
            outline
            color="success"
          >
            Shto Produkt
          </Button>

        ) : (
          <h4 className="mb-3 ml-4">Logohu qe te shtosh produkt</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
          <ModalHeader toggle={this.toggle}>Shto te produktet</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Emri Produktit</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Emri..."
                  onChange={this.onChange}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="kodi">Kodi</Label>
                <Input
                  type="text"
                  name="kodi"
                  id="kodi"
                  placeholder="Kodi..."
                  onChange={this.onChange}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="cmimBlerje">Cmimi Blerjes</Label>
                <Input
                  type="number"
                  name="cmimBlerje"
                  id="cmimBlerje"
                  placeholder="Cmimi..."
                  onChange={this.onChange}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="shitesi">Shitesi</Label>
                <Input
                  type="text"
                  name="shitesi"
                  id="shitesi"
                  placeholder="Shitesi"
                  onChange={this.onChange}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="prodhuesi">Prodhuesi</Label>
                <Input
                  type="text"
                  name="prodhuesi"
                  id="prodhuesi"
                  placeholder="Prodhuesi"
                  onChange={this.onChange}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="category">Kategori</Label>
                {/* <Input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Kategoria..."
                  onChange={this.onChange}
                  style={{ marginBottom: "1rem" }}
                /> */}
                <Select 
                  options={select_values}
                  value={category.value} 
                  name="category"
                  id="category"
                  onChange={this.handleChange}
                  placeholder="Kategoria..."
                  />
                <Button color="info" style={{ marginTop: "2rem" }} block outline>
                  Shto Produkt
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
  item: state.item,
  category: state.category,
  isAuthenticated: state.auth.isAuthenticated
});

//Connect takes as parameters the action and our mapping function
export default connect(
  mapStateToProps,
  { addItem, getCategories },
)(ItemModal); //Because we are using connect
