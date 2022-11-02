import { gapi } from 'gapi-script';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './FormEditcss.css'

//This function is going to be how we update the form.
//NEEDS THE FORM ID TO WORK


var textUpdateBody = {
    "includeFormInResponse": false,
    "requests": [
      {
        "createItem": {
          "item": {
            "questionItem": {
              "question": {
                "textQuestion": {
                  "paragraph": false
                }
              }
            }
          },
          "location": {
            "index": 0
          }
        }
      }
    ],
}


var scaleUpdateBody = {
  "includeFormInResponse": false,
  "requests": [
    {
      "createItem": {
        "item": {
          "questionItem": {
            "question": {
              "scaleQuestion": {
                "low": 0,
                "high": 10,
                "highLabel": "High",
                "lowLabel": "Low",

              }
            }
          }
        },
        "location": {
          "index": 0
        }
      }
    }
  ],
}

var MultiChoiceUpdateBody = {
  "includeFormInResponse": false,
  "requests": [
    {
      "createItem": {
        "item": {
          "questionItem": {
            "question": {
              "choiceQuestion": {
                "options": [{
                  "value": "a"
                },
                  {
                    "value": "b"
                  }
              ],
              "type": "RADIO"
              }
            }
          }
        },
        "location": {
          "index": 0
        }
      }
    }
  ],
}

function textUpdate(){
    gapi.client.request({
      path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId")+':batchUpdate',
      method: 'POST',
      body: textUpdateBody,
      headers: {
        "Content-type": "application/json",
    },
}).then(function(response) { return response.json;
     },            
        function(err) { console.error("form not created");});
    }

function multiUpdate(){
    gapi.client.request({
      path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId")+':batchUpdate',
      method: 'POST',
      body: MultiChoiceUpdateBody,
      headers: {
        "Content-type": "application/json",
    },
}).then(function(response) { return response.json;
      },            
        function(err) { console.error("form not created");});
    }

function scaleUpdate(){
      gapi.client.request({
        path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId")+':batchUpdate',
        method: 'POST',
        body: scaleUpdateBody,
        headers: {
          "Content-type": "application/json",
      },
  }).then(function(response) { return response.json;
        },            
          function(err) { console.error("form not created");});
      }



//Dakota- This is a basic prototype form consisting of text boxes asking for basic information such as email, first and last name, and favorite food
//The goal for the futre is to impliment images, videos, and a code editor to execute programs, as well as processes that allow for consistency 
//when taking in data, for example making sure the first letter is capitalized
function FormPrototype() {
  
  console.log(sessionStorage.getItem("currentFormId"));

  return (
    
    <Form>
        <img src = {require('./seluLogo2.png').default} alt = "SELU Logo" height = {200} width = {300} />
        <header className='formHeader'>Prototype Survey</header>
        <div className='formBody'>
      <Form.Group className='mb-3' controlId="formBasicEmail">
        <Form.Label className='formText'>Email address</Form.Label>
        <Form.Control type = "email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='formText'>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='formText'>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last Name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='formText'>Favorite Food</Form.Label>
        <Form.Control type="text" placeholder="Ex. Pizza" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>

    <div className='buttons'>
      <Button className = "CreateTextQuestion" onClick={textUpdate}>
        Create Text Question
      </Button>

      <Button className = "CreateMultiQuestion" onClick={multiUpdate}>
        Create Multi-choice Question
      </Button>

      <Button className = "CreateScaleQuestion" onClick={scaleUpdate}>
        Create Scale Question
      </Button>
      </div>
    </Form>
  );
}

export default FormPrototype;

