import React from "react";
import "./portal.css";
import { gapi } from 'gapi-script';
//import App from "./App";
//import SigninPage from "./App";

//const google = require('@googleapis/forms');
//const {authenticate} = require('@google-cloud/local-auth');



/*function createBasicForm(){
    axios.post('https://forms.googleapis.com/v1/forms', {
        "info": {
            "title" : "Test Form"
        }

    });
}*/


function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/forms.body"})
        .then(function() { console.log("Sign-in successful");},
              function(err) { console.error("Error signing in", err); },)
}
  
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
    title: "Test Form"
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
  
  /*
  function execute() {
    
    return gapi.client.forms.forms.create({
        info : {
            title : "Your favorite Programming Language",
        }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
*/
  
async function doAll(){
    authenticate();
    loadClient();
    execute();
  }

function Portal() {

    return(
        <div>
            <header className="header">
                <p1>Hello user!</p1>
            </header>
        <button className="create-button" onClick={doAll}>
            Create a Form!
        </button>
    </div>
    );

}
export default Portal;