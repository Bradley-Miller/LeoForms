import React, { useEffect, useState } from "react";
import "./portal.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { gapi } from 'gapi-script';
import { Navigate } from "react-router-dom";
import Popup from "reactjs-popup";
import Modal from 'react-bootstrap/Modal';
// eslint-disable-next-line
import Alert from 'react-bootstrap/Alert';


var title;

  function loadClient() {
    gapi.client.setApiKey("AIzaSyBsGjaICtZoaD65YgQk-o_A4y-jJ94cizU");
    return gapi.client.load("https://forms.googleapis.com/$discovery/rest?version=v1")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "372360721408-3lne1a7i7pd8jbeno7ds5dj9907jhqe3.apps.googleusercontent.com"});
  });
  // Make sure the client is loaded and sign-in is complete before calling this method.


  
  function GetFetch(){
    fetch(gapi.client.request({
      path: 'https://forms.googleapis.com/v1/forms',
      method: 'POST', 
      body: {
        "info" : {
          "title" : title,
        }
      },
      headers: {
          "Content-type": "application/json",
      },
  }).then(function(response){
      console.log(response.result.formId);
      //return(response.result.formId);
      return sessionStorage.setItem("currentFormId", response.result.formId);
    },));
  }


  function createForm(){
    loadClient();
   //sessionStorage.setItem("currentFormId", GetFetch());
   GetFetch();
   // execute();
    
  }

  function ModalAlert()
  {   
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [titleLocal, setTitleLocal] = useState('');
    const [showForm, setShowForm] = useState([false]);

  useEffect(() => {
    title = titleLocal;
  }, [titleLocal]);

  const handleTitleChange = event => {
    setTitleLocal(event.target.value);
    title = titleLocal;
  }

  const createThisForm = (res) =>{
    createForm();
    if(sessionStorage.getItem("currentFormId")!=null){
    setShowForm(true);
    }
  }
    return (
      <>
        <Button className="buttonC" onClick={handleShow}>
          Create a Form Here!
        </Button>
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Creating a form:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title of Form</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. Hello World!"
                  onChange = {event => handleTitleChange(event)}
                  autoFocus
                />
              </Form.Group>
            
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button varient = "Primary" type = "submit" onClick={createThisForm}>
              Submit</Button>
          </Modal.Footer>
        </Modal>
        
      </>
    );
  
  }

  function MyHeader()
  {
    const [show, setShow] = useState(true);
    if(show)
    {
      return(
        
        <Alert variant="success">
        <Alert.Heading>Hey, nice to see you {sessionStorage.getItem("currentLoggedIn")}!</Alert.Heading>
        <p>
          To create your own custom form, please click on the "Creat a Form" button below. 
          To add specific questions, please move forward to ou "Add Question" label located on the Nav Bar above.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
        
        </Alert>
        
      );
    }
  }
  
function Portal() {



  const [showForm, setShowForm] = useState([false]);

  const [titleLocal, setTitleLocal] = useState('');

  useEffect(() => {
    title = titleLocal;
  }, [titleLocal]);

  const handleTitleChange = event => {
    setTitleLocal(event.target.value);
    title = titleLocal;
  }
  

  const createThisForm = (res) =>{
    createForm();
    if(sessionStorage.getItem("currentFormId")!=null){
    setShowForm(true);
    }
  }
  console.log(showForm);
  /*if(loadClient() === ){*/
    if(showForm[0]===false){
      return(
        <div>
            <MyHeader/>
          <div className="container">
            <ModalAlert/>
        {/* <Popup trigger={<button className="create-button">Create a Form!</button>} position="top center"> 
              <div className="PopUpBackground">
                <Form.Label>Title</Form.Label>
                <Form.Control type = "text" onChange = {event => handleTitleChange(event)}/>
                <Button varient = "Primary" type = "submit" onClick={createThisForm}>Submit</Button>
              </div>
            </Popup> */}
          </div>
        </div>
      );
    }
      
     else if(showForm===true){
      return(
        <Navigate to={'/CreateForm'}/>
       );
      }

  }

  
export default Portal;