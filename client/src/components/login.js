import React, { Component } from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
import './login.css';
class Login extends Component {
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
        this.setState({name: data.user.name, logged_in: true});
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
          
  
          <div className="container">
            {this.state.logged_in ? (
              <h1>Logged in!</h1>
            ) : (
              <div>
                <h2>Register</h2>
                <Popup trigger={<button className='Trigger'> Register</button>} position="bottom center">
                <form className="column">
                 <p>Email</p> <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                 <p> Password</p> <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                 <p>First and last name</p> <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                 <p>Zipcode</p> <input type="text" name="zipcode" value={this.state.zipcode} onChange={this.handleChange} />
                  <button className ='Submit Trigger' onClick={(e) => this.loginOrRegister(false, e)}>Submit</button>
                </form>
                </Popup>
                
                <h2>Login</h2>  
                <Popup trigger={<button className='Trigger'> Login</button>} position="bottom center">
                <form className="column">
                <p>Email Address</p>
                  <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                  <p>Password</p>
                  <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                  <button className ='Submit Trigger' onClick={(e) => this.loginOrRegister(true, e)}>Submit</button>
                </form>
                </Popup>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
  
  export default Login;
  