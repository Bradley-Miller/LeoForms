import React, { useState } from "react";
import "./portal.css";
import { gapi } from 'gapi-script';
import { Navigate } from "react-router-dom";

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

  var form = {
    "info" : {
        "title": "Hello World!",
    }
  }

 function execute(){
    return gapi.client.request({
        path: 'https://forms.googleapis.com/v1/forms',
        method: 'POST', 
        body: form,
        headers: {
            "Content-type": "application/json",
        },
    }).then(function() { console.log ("form created!");},
            function(err) { console.error("form not created");});
        }
  

  function createForm(){
    loadClient();
    execute();
    
  }

function Portal() {

  const [showForm, setShowForm] = useState([false]);

  const createThisForm = (res) =>{
    createForm();
    setShowForm(true);
  }
  console.log(showForm);
  if(showForm[0]===false){
    return(
        <div>
            <header className="header">
                <p1>Hello {sessionStorage.getItem("currentLoggedIn")}</p1>
            </header>
        <button className="create-button" onClick={createThisForm}>
            Create a Form!
        </button>
    </div>
    );
    }
   if(showForm===true){
    return(
      <Navigate to={'/form'}/>
     );
    }
  }

export default Portal;