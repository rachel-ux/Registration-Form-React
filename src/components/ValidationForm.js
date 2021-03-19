import './Form.css';
import React from "react";
const initialState = {
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
  passwordError: "",
  isLoggedIn: false,
};
var name;
var email;
//var setIsSubmitted = false;
var isSubmitted = false;
export default class ValiationForm extends React.Component {
  state = initialState;

  
  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    if (!this.state.name) {
      nameError = "name cannot be blank";
    }
    if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      emailError = 'emailaddress is invalid';
    }

    if(!this.state.password){
      passwordError = "password cannot be blank";
    }
    if (emailError || nameError || passwordError) {
      this.setState({ emailError, nameError, passwordError });
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      name = this.state.name;
      email = this.state.email;
      this.setState({ isLoggedIn : true});
      //this.setState(initialState);
      isSubmitted = true;
      //setIsSubmitted = true;
    }
  };

  render() {
    return (
      <div>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='img/img-4.svg' alt='spaceship' />
        </div>
        {!isSubmitted ? (
          <div className='form-content-right'>
          <form onSubmit={this.handleSubmit} className='form'>
            <div className='form-inputs'>
              <label className='form-label'>Username</label>
              <input
                className='form-input'
                type='text'
                name='name'
                placeholder='Enter your username'
                value = {this.state.name}
                onChange={this.handleChange}
              />
              <div style={{fontsize: 12, color: "red"}}>{this.state.nameError}</div>
            </div>
            <div className='form-inputs'>
              <label className='form-label'>Email</label>
              <input
                className='form-input'
                type='email'
                name='email'
                placeholder='Enter your email'
                value= {this.state.email}
                onChange={this.handleChange}
              />
               <div style={{fontsize: 12, color: "red"}}>{this.state.emailError}</div>
            </div>
            <div className='form-inputs'>
              <label className='form-label'>Password</label>
              <input
                className='form-input'
                type='password'
                name='password'
                placeholder='Enter your password'
                value= {this.state.password}
                onChange={this.handleChange}
              />
               <div style={{fontsize: 12, color: "red"}}>{this.state.passwordError}</div>
            </div>
            <button className='form-input-btn' type='submit'>
              Sign up
            </button>
            <span className='form-input-login'>
              Already have an account? Login <a href='https://www.google.co.in/'>here</a>
            </span>
          </form>
        </div>
        ) : (
          <div className='form-content-right'>
      <h1 className='form-success'>We have received your request!</h1>
      <div>{this.state.isLoggedIn ? <div>
        <ul className='list'>
          <li>{name}</li>
          <li>{email}</li>
        </ul>
      </div> : ""}</div>
    </div>
        )}
      </div>
      </div>
    );
  }
}
