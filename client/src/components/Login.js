import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fire from './../fire';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      success: false,
      failed: false
    }
  }

  // This function handles login verification
  handleLogin(e) {
    e.preventDefault();
    const usersRef = fire.database().ref('users');
    var user = this.state.username;
    usersRef
      .on('child_added', (snapshot) => {
      if(snapshot.val().user === this.state.username && snapshot.val().password === this.state.password) {
        console.log("yes!!");
        console.log("this is your password:" + snapshot.val().password);
        console.log("this is your username:" + snapshot.val().user);

        var succ = this.state.success ? false : true;
        this.setState({success : succ});
        this.setState({failed : false});
      }
      else{ // login fails
        var fail = this.state.failed ? false : true;
        this.setState({failed : fail});
        this.setState({success : false});
      }
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
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleLogin(event)}/>
         </div>
         </MuiThemeProvider>
         {this.state.success ? <h1> hello {this.state.username}! you are logged in. </h1> : null}
         {this.state.failed ? <h1> wrong username or password </h1> : null}
      </div>
      </center>
    );
  }
}

const style = {

};

export default Login;
