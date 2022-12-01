import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
//import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
//import Form from 'react-bootstrap/Form';
import  '../custom.css'
// eslint-disable-next-line
import { Navigate, useNavigate } from 'react-router-dom';

function HomeNavBar() {
// eslint-disable-next-line
    const [ profile, setProfile ] = useState([]);
    const [ loggedIn, setLoggedIn] = useState([false]);
    const clientId = "372360721408-3lne1a7i7pd8jbeno7ds5dj9907jhqe3.apps.googleusercontent.com"

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

 
  const onSuccess = (res) => {
    setLoggedIn(true);
    
  };

  const onFailure = (err) => {
    console.log('failed', err);
  };

  const logOut = (res) => {
    setLoggedIn(false);
    gapi.client.init({clientId:''});
    window.location.replace('/');
  };
  
console.log(loggedIn);

  if (loggedIn[0]===false){
    return (

          <Navbar variant = "dark" className = "navbar-custom"  expand="lg">

            <Navbar.Brand href="/">
              <img src = {require('./SLU-web-header.png').default} alt = "SELU Logo" height = {100} width = {400} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="container-fluid">
                <Nav.Link href="/CreateForm">Create Form</Nav.Link>
                <Nav.Link href="/Portal">View Forms</Nav.Link>
                <Nav.Link href="/OpenForm">Open Form</Nav.Link>
                <Nav.Link href="/EmailBreach">Email Breach</Nav.Link>
                <Nav.Link href="/PasswordCheck">Password Check</Nav.Link>
               
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Item className = "ms-auto">
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                  />
                  </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          
        </Navbar>
        );
    }

    else
    {
        return (

            <Navbar variant = "dark" className = "navbar-custom"  expand="lg">
          
          <Navbar.Brand href="/">
              <img src = {require('./SLU-web-header.png').default} alt = "SELU Logo" height = {100} width = {400} />
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="container-fluid">
                <Nav.Link href="/CreateForm">Create Form</Nav.Link>
                <Nav.Link href="/Portal">View Forms</Nav.Link>

                <Nav.Link href="/OpenForm">Open Form</Nav.Link>


                <Nav.Link href="/EmailBreach">Email Breach</Nav.Link>
                <Nav.Link href="/PasswordCheck">Password Check</Nav.Link>
                
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Item className = "ms-auto">
                <GoogleLogout
                    clientId={clientId}
                    buttonText = "Logout"
                    onSuccess = {logOut}
                    onLogoutSuccess={logOut}
                    onFailure = {onFailure}
                  />
                  
                  </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          
        </Navbar>
          );

    }
}
export default HomeNavBar;