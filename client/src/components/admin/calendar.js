import React, { Component } from "react";
 
import Calendar from "react-material-ui-calendar";

class Kalendar extends Component {

  callBackFunction = value => {
    console.log("The selection is  -> ", value);
  };

  render(){
    return (
      <div className='container'>
        <Calendar 
          generalStyle={{
            maxWidth: "auto",
            margin: "auto",
            backgroundColor: "rgba(55,54,54,1)",
            height: "auto",
            overflow: "auto"
          }}
          selection={this.callBackFunction}
        />
      </div>
    );
  }
}

export default Calendar;