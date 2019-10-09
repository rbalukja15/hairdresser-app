import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux"; //Allows to get state from redux to react component
import {
  getItems,
  deleteItem,
  getItemById,
  updateItem
} from "../../actions/itemActions"; //Import the actions
import { getCategories } from "../../actions/categoryActions";
import PropTypes from "prop-types"; //Whenever you have component property put it inside a proptypes which is a form of validation

//Toastr Part
import { toastr } from "react-redux-toastr"; //Toastr for validation notifications
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"; //CSS for toastr

//Date part
import moment from "moment"; //Moment library for date editting

//Material-UI Part
import MUIDataTable from "mui-datatables";

//
//THE WAY REDUX WORKS
//CARS => COMPONENT->ACTION->REDUCER->STORE

//Toastr confirm options
const toastrConfirmOptions = {
  onOk: () => {},
  onCancel: () => {
    console.log("CANCEL: clicked");
    return;
  }
};

//Select Part
let select_values = [];

class ShoppingList extends Component {
  state = {
    editModal: false,
    counter: 1,
    editItem: {
      _id: "",
      name: "",
      kodi: "",
      cmimBlerje: "",
      prodhuesi: "",
      shitesi: "",
      category: ""
    }
  };

  //When you bring in an action from redux it is going to be stored as props
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    getItemById: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired, //Represents our state
    category: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentWillMount() {
    //Runs when the component mounts
    //Here we run actions
    this._refreshItems();
    //console.log(this.category);
  }

  //Call the delete action
  onDeleteClick = id => {
    toastr.confirm("Je e sigurte ?", toastrConfirmOptions);
    toastrConfirmOptions.onOk = () => {
      this.props.deleteItem(id);
      console.log("Item Deleted");
      toastr.success("Produkti u fshi me sukses");
    };
  };

  //Call the update function
  updateItem() {
    //console.log(this.state.editItem._id);

    //Call the update action and pass the item state
    this.props.updateItem(this.state.editItem);

    toastr.success(
      "Modifikim",
      `Produkti ${this.state.editItem.name} u modifikua me sukses`
    );

    //Refresh the data
    this._refreshItems();

    //Reset the state
    this.setState({
      editModal: false,
      editItem: {
        _id: "",
        name: "",
        kodi: "",
        cmimBlerje: "",
        prodhuesi: "",
        shitesi: "",
        category: ""
    }
    });
  }

  //Refresh function for the datas in the table
  _refreshItems() {
    this.props.getItems();
    this.props.getCategories();
    //console.log(this.props.getCategories());
  }

  //Edit function to get the data from the table row into the state
  editItem(_id, name, kodi, cmimBlerje, prodhuesi, shitesi, category) {
    this.setState({
      editItem: {
        _id,
        name,
        kodi,
        cmimBlerje,
        prodhuesi,
        shitesi,
        category
      },
      editModal: !this.state.editModal
    });
    //console.log(this.state.editItem,"0000");
  }

  //Toggle the edit modal function
  toggleEdit = () => {
    this.setState({
      editModal: !this.state.editModal
    });
  };

  //Handle select input option
  handleChange = category => {
    let { editItem } = this.state;
    editItem.category = category.value;
    this.setState({ editItem });
    console.log(`Option selected:`, category.value);
  };

  render() {
    const { items } = this.props.item; //Pull the items
    const { categories } = this.props.category; //Pull the categories
    // const  {category } = this.state.editItem;
   // console.log(category);
    // Map the categories

    // categories.map(({ _id, name }) => {
    //   select_values.push({
    //     label: name,
    //     value: name
    //   });
    // }); 
     select_values = categories.slice(0);
     select_values = select_values.map(category => ({ label: category.name, value: category.name }))
    // // <sele id=""></select>
    // categories.map(cat=>{
    //   console.log(cat);
    // })
    
     
     //console.log(select_values,"categories lists");

    const columns = [
      "Nr",
      "Emri",
      "Kodi",
      "Cmimi Blerjes",
      "Prodhuesi",
      "Furnitori",
      "Kategoria",
      "Data",
      "Fshi/Modifiko"
    ];
    const data = [];

    items.map(
      ({ _id, name, kodi, cmimBlerje, prodhuesi, shitesi, category, date }) =>
        data.push([
          this.state.counter,
          name,
          kodi,
          cmimBlerje,
          prodhuesi,
          shitesi,
          category,
          moment(date).calendar(),
          <div>
            <Button
              className="remove-btn mb-2"
              outline
              color="danger"
              size="sm"
              onClick={this.onDeleteClick.bind(this, _id)}
            >
              Fshi
            </Button>
            <Button
              className="edit-btn"
              outline
              color="warning"
              size="sm"
              onClick={this.editItem.bind(
                this,
                _id,
                name,
                kodi,
                cmimBlerje,
                prodhuesi,
                shitesi,
                category
              )}
            >
              Modifiko
            </Button>
          </div>
        ])
    );
    //&times;

    //MUI-Table options
    const options = {
      filterType: "dropdown",
      selectableRows: "none",
      responsive: "scroll",
      isRowSelectable: function(dataIndex) {
        return false;
      }
    };

    return (
      <div>
        {/* Edit Modal Part */}
        <Modal
          isOpen={this.state.editModal}
          toggle={this.toggleEdit.bind(this)}
          centered={true}
        >
          <ModalHeader toggle={this.toggleEdit.bind(this)}>
            Modifiko produktet
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="item">Emri Produktit</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  value={this.state.editItem.name}
                  onChange={e => {
                    let { editItem } = this.state;
                    editItem.name = e.target.value;
                    this.setState({ editItem });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="kodi">Kodi</Label>
                <Input
                  type="text"
                  name="kodi"
                  id="kodi"
                  value={this.state.editItem.kodi}
                  onChange={e => {
                    let { editItem } = this.state;
                    editItem.kodi = e.target.value;
                    this.setState({ editItem });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="cmimBlerje">Cmimi Blerjes</Label>
                <Input
                  type="number"
                  name="cmimBlerje"
                  id="cmimBlerje"
                  value={this.state.editItem.cmimBlerje}
                  onChange={e => {
                    let { editItem } = this.state;
                    editItem.cmimBlerje = e.target.value;
                    this.setState({ editItem });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="shitesi">Shitesi</Label>
                <Input
                  type="text"
                  name="shitesi"
                  id="shitesi"
                  value={this.state.editItem.shitesi}
                  onChange={e => {
                    let { editItem } = this.state;
                    editItem.shitesi = e.target.value;
                    this.setState({ editItem });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="prodhuesi">Prodhuesi</Label>
                <Input
                  type="text"
                  name="prodhuesi"
                  id="prodhuesi"
                  value={this.state.editItem.prodhuesi}
                  onChange={e => {
                    let { editItem } = this.state;
                    editItem.prodhuesi = e.target.value;
                    this.setState({ editItem });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="category">Kategori</Label>
                <Select
                  name="category"
                  id="category"
                  autoFocus
                  simpleValue
                  options={select_values}
                  value= {select_values.filter(cat => cat.value === this.state.editItem.category)}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="info"
              style={{ marginTop: "2rem" }}
              block
              outline
              onClick={this.updateItem.bind(this)}
            >
              Modifiko Produkt
            </Button>{" "}
            <Button
              color="danger"
              style={{ marginTop: "2rem" }}
              block
              outline
              onClick={this.toggleEdit.bind(this)}
            >
              Mbyll
            </Button>
          </ModalFooter>
        </Modal>
        {this.props.isAuthenticated ? (
          <MUIDataTable
            title={"Lista e produkteve"}
            data={data}
            columns={columns}
            options={options}
          />
        ) : (
          ""
        )}
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
  { getItems, deleteItem, getItemById, updateItem, getCategories }
)(ShoppingList);
