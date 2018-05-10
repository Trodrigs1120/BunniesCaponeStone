import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";

class Receipt extends Component {
    constructor() {
      super();
  
      this.state = {
          // We'll probably want to grab the state from the main somehow
        name: '',
        itemspurchased:[],
        date:"",
        // we'll need to make sure the date is set in a consistent format for the query
      }


      
    }
}

export default Receipt;