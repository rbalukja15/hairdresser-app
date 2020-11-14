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
import {
  getSales,
  deleteSale,
  getSaleById,
  updateSale
} from "../../actions/saleActions"; //Import the actions
import PropTypes from "prop-types"; //Whenever you have component property put it inside a proptypes which is a form of validation
import { connect } from "react-redux"; //To connect react and redux
//Material-UI Part
import MUIDataTable from "mui-datatables";
import moment from "moment"; //Moment library for date editting
import {customRowIndexColumn} from "../../utils/mui-table";
import InvoiceModal from "../invoice/Invoice";

//Toastr Part
// import { toastr } from "react-redux-toastr"; //Toastr for validation notifications
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ViewSaleDetailsModal from "../modals/sale/ViewSaleDetailsModal"; //CSS for toastr

//
//THE WAY REDUX WORKS
//CARS => COMPONENT->ACTION->REDUCER->STORE

class Sale extends Component {
  state = {
    editModal: false,
    editSale: {
      _id: "",
      clientName: "",
      clientSurname: "",
      productName: "",
      sasia: "",
      cmimi: "",
      kodi: ""
    },
  };

  //When you bring in an action from redux it is going to be stored as props
  static propTypes = {
    getSales: PropTypes.func.isRequired,
    getSaleById: PropTypes.func.isRequired,
    updateSale: PropTypes.func.isRequired,
    sale: PropTypes.object.isRequired, //Represents our state
    isAuthenticated: PropTypes.bool
  };

  componentWillMount() {
    //Runs when the component mounts
    //Here we run actions
    this._refreshSales();
  }

  //Call the delete action
  onDeleteClick = id => {
    this.props.deleteSale(id);
  };

  //Call the update function
  updateSale() {
    //console.log(this.state.editSale._id);

    //Call the update action and pass the sale state
    this.props.updateSale(this.state.editSale);

    //Refresh the data
    this._refreshSales();

    //For repeating items
    this.componentWillMount();

    //Reset the state
    this.setState({
      editModal: false,
      _id: "",
      clientName: "",
      clientSurname: "",
      productName: "",
      sasia: "",
      cmimi: "",
      kodi: ""
    });
  }

  //Refresh function for the datas in the table
  _refreshSales() {
    this.props.getSales();
  }

  //Edit function called to get the data from the table row into the state
  editSale(_id, clientName, clientSurname, productName, sasia, cmimi, kodi) {
    this.setState({
      editSale: {
        _id,
        clientName,
        clientSurname,
        productName,
        sasia,
        cmimi,
        kodi
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
    const { sales } = this.props.sale; //Pull the sales
    const columns = [
      customRowIndexColumn(),
      "Emri Klientit",
      "Totali",
      //"Data", //Todo add invoice date
      "Data Regjistrimit",
      "Fshi",
      "Detajet"
    ];
    const data = [];

      sales.map(
        ({
           _id,
           clientName,
           total,
           date,
            invoiceData,
        }) =>
          data.push([
            _id,
            clientName,
            total,
            moment(date).calendar(),
              <Button
                  className="remove-btn mb-2"
                  outline
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, _id)}
              >
                Fshi
              </Button>,
            <InvoiceModal
                invoiceTitle="Shitje"
                invoiceType={1}
                invoiceData={invoiceData}
                client={clientName}
                saleId={_id}
                refreshData={this._refreshSales.bind(this)}
            />
          ])
      );

    const options = {
      filterType: "dropdown",
      responsive: "standard",
      selectableRows: "none",
      isRowSelectable: function(dataIndex) {
        return false;
      },
    };

    return (
      <div style={{ width: "100%"}}>

        <InvoiceModal 
          invoiceTitle="Shitje" 
          invoiceType={1}
        />

        {/* Edit Modal Part */}
        <Modal
          isOpen={this.state.editModal}
          toggle={this.toggleEdit.bind(this)}
          centered={true}
        >
          <ModalHeader toggle={this.toggleEdit.bind(this)}>
            Modifiko Shitjen
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="clientName">Emri Klientit</Label>
                <Input
                  type="text"
                  name="clientName"
                  id="clientName"
                  value={this.state.editSale.clientName}
                  onChange={e => {
                    let { editSale } = this.state;
                    editSale.clientName = e.target.value;
                    this.setState({ editSale });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="clientSurname">Mbiemri Klientit</Label>
                <Input
                  type="text"
                  name="clientSurname"
                  id="clientSurname"
                  value={this.state.editSale.clientSurname}
                  onChange={e => {
                    let { editSale } = this.state;
                    editSale.clientSurname = e.target.value;
                    this.setState({ editSale });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="productName">Emri Produktit</Label>
                <Input
                  type="text"
                  name="productName"
                  id="productName"
                  value={this.state.editSale.productName}
                  onChange={e => {
                    let { editSale } = this.state;
                    editSale.productName = e.target.value;
                    this.setState({ editSale });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="sasia">Sasia</Label>
                <Input
                  type="number"
                  name="sasia"
                  id="sasia"
                  value={this.state.editSale.sasia}
                  onChange={e => {
                    let { editSale } = this.state;
                    editSale.sasia = e.target.value;
                    this.setState({ editSale });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="cmimi">Cmimi</Label>
                <Input
                  type="number"
                  name="cmimi"
                  id="cmimi"
                  value={this.state.editSale.cmimi}
                  onChange={e => {
                    let { editSale } = this.state;
                    editSale.cmimi = e.target.value;
                    this.setState({ editSale });
                  }}
                  style={{ marginBottom: "1rem" }}
                />
                <Label for="kodi">Kodi</Label>
                <Input
                  type="text"
                  name="kodi"
                  id="kodi"
                  value={this.state.editSale.kodi}
                  onChange={e => {
                    let { editSale } = this.state;
                    editSale.kodi = e.target.value;
                    this.setState({ editSale });
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
            title={"Lista e Shitjeve"}
            data={data}
            columns={columns}
            options={options}
          />
        ) : null}
      </div>
    );
  }
}

//Mapping function
//Allow to take the sales state and maps it into a component property
const mapStateToProps = state => ({
  sale: state.sale,
  isAuthenticated: state.auth.isAuthenticated
});

//Connect takes as parameters the action and our mapping function
export default connect(
  mapStateToProps,
  { getSales, deleteSale, getSaleById, updateSale }
)(Sale);
