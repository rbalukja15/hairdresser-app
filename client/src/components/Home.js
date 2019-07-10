import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import Calendar from "react-material-ui-calendar";

//Date part
import moment from "moment"; //Moment library for date editting

//Material-UI Part
import MUIDataTable from "mui-datatables";

const containerStyle = {
  marginTop: "40px",
  marginLeft: "10px"
};

class Home extends Component {
  callBackFunction = value => {
    console.log("The selection is  -> ", value);
  };

  render() {
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
      <Container style={containerStyle}>
        <Calendar
          generalStyle={{
            maxWidth: "100%",
            margin: "0 auto 25px",
            backgroundColor: "rgba(102, 127, 153, 0.7)",
            height: "100%",
            overflow: "auto"
          }}
          selection={this.callBackFunction}
        />
        {/* <MUIDataTable
            title={"Lista e produkteve"}
            data={data}
            columns={columns}
            options={options}
          /> */}
        <Button></Button>
      </Container>
    );
  }
}

export default Home;
