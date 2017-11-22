import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fire from './../fire';


import './Login.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  handleRegister(e) {
    e.preventDefault();
    const usersRef = fire.database().ref('users');
    const user = {
      user: this.state.username,
      password: this.state.password
    }
    usersRef.push(user);
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {
    return (
      <center>
      <div>
        <MuiThemeProvider>
          <div>
          <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
               <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Re-Enter Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />

             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleRegister(event)}/>
         </div>

         </MuiThemeProvider>
      </div>
      </center>
    );
  }
}

const style = {

};

export default Register;