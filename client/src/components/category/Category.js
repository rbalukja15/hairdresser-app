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
import { connect } from "react-redux"; //Allows to get state from redux to react component
import {
  getCategories,
  deleteCategory,
  getCategoryById,
  updateCategory
} from "../../actions/categoryActions"; //Import the actions
import PropTypes from "prop-types"; //Whenever you have component property put it inside a proptypes which is a form of validation

//Material-UI Part
import MUIDataTable from "mui-datatables";

import moment from "moment"; //Moment library for date editting

//Toastr Part
import { toastr } from "react-redux-toastr"; //Toastr for validation notifications
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"; //CSS for toastr
// import { bindActionCreators } from "redux";
// import { actions as toastrActions } from "react-redux-toastr";

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

class Category extends Component {
  // constructor(props) {
  //   super(props);
    // Bind the react-redux-toastr actions to the component
    // this.toastr = bindActionCreators(toastrActions, this.props.dispatch)

    // this.toastr.add({
    //   id: "mycustomid", // If not provided we will add one.
    //   type: "success",
    //   title: "your title",
    //   position: "top-left", // This will override the global props position.
    //   attention: true, // This will add a shadow like the confirm method.
    //   onAttentionClick: id => {}, //override default behavior of 'attention' background click.
    //   message: "message",
    //   options: {}
    // });

    // this.toastr.remove("toastrId");
  // }

  state = {
    editModal: false,
    counter: 1,
    editCategory: {
      _id: "",
      name: ""
    }
  };

  //When you bring in an action from redux it is going to be stored as props
  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    getCategoryById: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired, //Represents our state
    isAuthenticated: PropTypes.bool
  };

  componentWillMount() {
    //Runs when the component mounts
    //Here we run actions
    this._refreshCategories();
  }

  //Call the delete action
  onDeleteClick = id => {
    toastr.confirm("Je e sigurte ?", toastrConfirmOptions);
    toastrConfirmOptions.onOk = () => {
      this.props.deleteCategory(id);
      console.log("Category Deleted");
      toastr.success("Kategoria u fshi me sukses");
    };
      
  };

  //Call the update function
  updateCategory() {
    //console.log(this.state.editItem._id);

    //Call the update action and pass the item state
    this.props.updateCategory(this.state.editCategory);

    toastr.success(
      "Modifikim",
      `Kategoria ${this.state.editCategory.name} u modifikua me sukses`
    );

    //Refresh the data
    this._refreshCategories();

    //Reset the state
    this.setState({
      editModal: false,
      _id: "",
      name: ""
    });
  }

  //Refresh function for the datas in the table
  _refreshCategories() {
    this.props.getCategories();
  }

  //Edit function to get the data from the table row into the state
  editCategory(_id, name) {
    this.setState({
      editCategory: {
        _id,
        name
      },
      editModal: !this.state.editModal
    });
  }

  //Toggle the edit modal function
  toggleEdit = () => {
    this.setState({
      editModal: !this.state.editModal
    });
  };

  render() {
    const { categories } = this.props.category; //Pull the items
    const columns = ["Nr", "Name", "Date", "Surname", "Age", "Fshi/Modifiko"];
    const data = [];

    let counter = this.state.counter;

      categories.map(({ _id, name, date }) =>
        data.push([
          counter++,
          name,
          moment(date).format("DD-MM-YYYY"),
          "Test",
          "Test",
          <div>
            <Button
              className="remove-btn "
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
              onClick={this.editCategory.bind(this, _id, name)}
            >
              Modifiko
            </Button>
          </div>
        ])
      );

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: "none",
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
            Modifiko kategorite
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="item">Emri Kategorise</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  value={this.state.editCategory.name}
                  onChange={e => {
                    let { editCategory } = this.state;
                    editCategory.name = e.target.value;
                    this.setState({ editCategory });
                  }}
                  style={{ marginBottom: "1rem" }}
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
              onClick={this.updateCategory.bind(this)}
            >
              Modifiko Kategori
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
            title={"Lista e Kategorive"}
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
  category: state.category,
  isAuthenticated: state.auth.isAuthenticated
});

//Connect takes as parameters the action and our mapping function
export default connect(
  mapStateToProps,
  { getCategories, deleteCategory, getCategoryById, updateCategory }
)(Category);
