import React, { Component } from 'react';
import axios from 'axios';
import Login from './components/login';
import Header from './components/Header';

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      zipcode:'',
      logged_in: false,
      id:'',
    }
  }


  isAuthenticated() {
    axios.get('/isauth')
      .then(({data}) => {
        if ( data.user )
        //where the logged in status change occurs
        // adding a line to set the identifier
          this.setState({name: data.user.email, logged_in: true, id:data.user._id});
        
      }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Header name={this.state.name} />

              <Login />
            
      
        
      </div>
    );
  }
}

export default App;
