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
} from "reactstrap"; //Allows to get state from redux to react component
import {
  getBuyings,
  deleteBuying,
  getBuyingById,
  updateBuying
} from "../../actions/buyingActions"; //Import the actions
import PropTypes from "prop-types"; //Whenever you have component property put it inside a proptypes which is a form of validation
import { connect } from "react-redux"; //To connect react and redux
//Material-UI Part
import MUIDataTable from "mui-datatables";
import moment from "moment"; //Moment library for date editting

//
//THE WAY REDUX WORKS
//CARS => COMPONENT->ACTION->REDUCER->STORE

class Buying extends Component {
  state = {
    editModal: false,
    counter: 1,
    editBuying: {
      _id: "",
      name: "",
      kodi: "",
      cmimBlerje: "",
      prodhuesi: "",
      shitesi: "",
      category: "",
      sasia: ""
    }
  };

  //When you bring in an action from redux it is going to be stored as props
  static propTypes = {
    getBuyings: PropTypes.func.isRequired,
    getBuyingById: PropTypes.func.isRequired,
    updateBuying: PropTypes.func.isRequired,
    buying: PropTypes.object.isRequired, //Represents our state
    isAuthenticated: PropTypes.bool
  };

  componentWillMount() {
    //Runs when the component mounts
    //Here we run actions
    this._refreshBuyings();
  }

  //Call the delete action
  onDeleteClick = id => {
    this.props.deleteBuying(id);
  };

  //Call the update function
  updateSale() {
    //console.log(this.state.editBuying._id);

    //Call the update action and pass the sale state
    this.props.updateBuying(this.state.editBuying);

    //Refresh the data
    this._refreshBuyings();

    this.componentWillMount();

    //Reset the state
    this.setState({
      editModal: false,
      _id: "",
      name: "",
      kodi: "",
      cmimBlerje: "",
      prodhuesi: "",
      shitesi: "",
      category: "",
      sasia: ""
    });
  }

  //Refresh function for the datas in the table
  _refreshBuyings() {
    this.props.getBuyings();
  }

  //Edit function called to get the data from the table row into the state
  editBuying(_id, name, kodi, cmimBlerje, prodhuesi, shitesi, category, sasia) {
    this.setState({
      editBuying: {
        _id,
        name,
        kodi,
        cmimBlerje,
        prodhuesi,
        shitesi,
        category,
        sasia
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
    //console.log(this.props);
    const { buyings } = this.props.buying; //Pull the buyings

    const columns = [
      "Nr",
      "Emer",
      "Kodi",
      "Cmimi Blerjes",
      "Prodhuesi",
      "Shitesi",
      "Kategori",
      "Sasia",
      "Data",
      "Fshi/Modifiko"
    ];
    const data = [];

    buyings.map(
      ({
        _id,
        name,
        kodi,
        cmimBlerje,
        prodhuesi,
        shitesi,
        category,
        sasia,
        date
      }) =>
        data.push([
          this.state.counter,
          name,
          kodi,
          cmimBlerje,
          prodhuesi,
          shitesi,
          category,
          sasia,
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
              onClick={this.editBuying.bind(
                this,
                _id,
                name,
                kodi,
                cmimBlerje,
                prodhuesi,
                shitesi,
                category,
                sasia
              )}
            >
              Modifiko
            </Button>
          </div>
        ])
    );

    //console.log(sales);

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
            Modifiko Blerjen
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Emri</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.editBuying.name}
                  onChange={e => {
                    let { editBuying } = this.state;
                    editBuying.name = e.target.value;
                    this.setState({ editBuying });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="kodi">Kodi</Label>
                <Input
                  type="text"
                  name="kodi"
                  id="kodi"
                  value={this.state.editBuying.kodi}
                  onChange={e => {
                    let { editBuying } = this.state;
                    editBuying.kodi = e.target.value;
                    this.setState({ editBuying });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="cmimBlerje">Cmimi Blerjes</Label>
                <Input
                  type="number"
                  name="cmimBlerje"
                  id="cmimBlerje"
                  value={this.state.editBuying.cmimBlerje}
                  onChange={e => {
                    let { editBuying } = this.state;
                    editBuying.cmimBlerje = e.target.value;
                    this.setState({ editBuying });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="prodhuesi">Prodhuesi</Label>
                <Input
                  type="text"
                  name="prodhuesi"
                  id="prodhuesi"
                  value={this.state.editBuying.prodhuesi}
                  onChange={e => {
                    let { editBuying } = this.state;
                    editBuying.prodhuesi = e.target.value;
                    this.setState({ editBuying });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="shitesi">Shitesi</Label>
                <Input
                  type="text"
                  name="shitesi"
                  id="shitesi"
                  value={this.state.editBuying.shitesi}
                  onChange={e => {
                    let { editBuying } = this.state;
                    editBuying.shitesi = e.target.value;
                    this.setState({ editBuying });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="category">Kategori</Label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  value={this.state.editBuying.category}
                  onChange={e => {
                    let { editBuying } = this.state;
                    editBuying.category = e.target.value;
                    this.setState({ editBuying });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="sasia">sasia</Label>
                <Input
                  type="number"
                  name="sasia"
                  id="sasia"
                  value={this.state.editBuying.sasia}
                  onChange={e => {
                    let { editBuying } = this.state;
                    editBuying.sasia = e.target.value;
                    this.setState({ editBuying });
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
              onClick={this.updateSale.bind(this)}
            >
              Modifiko Blerjen
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
            title={"Lista e Blerjeve"}
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
//Allow to take the sales state and maps it into a component property
const mapStateToProps = state => ({
  buying: state.buying,
  isAuthenticated: state.auth.isAuthenticated
});

//Connect takes as parameters the action and our mapping function
export default connect(
  mapStateToProps,
  { getBuyings, deleteBuying, getBuyingById, updateBuying }
)(Buying);
