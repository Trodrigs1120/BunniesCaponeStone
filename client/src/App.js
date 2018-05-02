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
      logged_in: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  loginOrRegister(is_login, e) {
    e.preventDefault();

    let route = is_login ? '/login' : '/register';

    axios.post(route, {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      zipcode: this.state.zipcode
    }).then(({ data }) => {
      console.log(data)
      this.setState({name: data.user.email, logged_in: true});
    }); 
  }

  componentDidMount = () => {
    this.isAuthenticated();
  }  

  isAuthenticated() {
    axios.get('/isauth')
      .then(({data}) => {
        if ( data.user )
          this.setState({name: data.user.email, logged_in: true});
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
