import { gapi } from 'gapi-script';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Popup from 'reactjs-popup';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import './FormEditcss.css'

//This function is going to be how we update the form.
//NEEDS THE FORM ID TO WORK



var count = 0;
var title;
var scaleTitle;
// eslint-disable-next-line
var choiceCount;
var lowValue;
var highValue;
var highLabel;
var lowLabel;
var optionValueOne;
var optionValueTwo;
var multiOptionRender;


function textUpdate(){
    gapi.client.request({
      path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId")+':batchUpdate',
      method: 'POST',
      body: { "includeFormInResponse": false,
      "requests": [
        {
          "createItem": {
            "item": {
              "title" : title,
              "questionItem": {
                "question": {
                  "textQuestion": {
                    "paragraph": false
                  }
                }
              }
            },
            "location": {
              "index": count
            }
          }
        }
      ],
  },
      headers: {
        "Content-type": "application/json",
    },
}).then(function(response) {console.log(count); return response.json;
     },            
        function(err) { console.error("form not created");}); count++;
    }

function multiUpdate(){
    gapi.client.request({
      path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId")+':batchUpdate',
      method: 'POST',
      body: {"includeFormInResponse": false,
      "requests": [
        {
          "createItem": {
            "item": {
              "questionItem": {
                "question": {
                  "choiceQuestion": {
                    "options": [{
                      "value": optionValueOne
                    },
                      {
                        "value": optionValueTwo
                      }
                  ],
                  "type": multiOptionRender
                  }
                }
              }
            },
            "location": {
              "index": count
            }
          }
        }
      ],},
      headers: {
        "Content-type": "application/json",
    },
}).then(function(response) {console.log(count); return response.json;
      },            
        function(err) { console.error("form not created");}); count++;
    }

function scaleUpdate(){
      gapi.client.request({
        path: 'https://forms.googleapis.com/v1/forms/'+sessionStorage.getItem("currentFormId")+':batchUpdate',
        method: 'POST',
        body: {  "includeFormInResponse": false,
        "requests": [
          {
            "createItem": {
              "item": {
                "title" : scaleTitle,
                "questionItem": {
                  "question": {
                    "scaleQuestion": {
                      "low": lowValue,
                      "high": highValue,
                      "highLabel": highLabel,
                      "lowLabel": lowLabel,
      
                    }
                  }
                }
              },
              "location": {
                "index": count
              }
            }
          }
        ],},
        headers: {
          "Content-type": "application/json",
      },
  }).then(function(response) {console.log(count); return response.json;
        },            
          function(err) { console.error("form not created");}); count++;
      }

  

//Dakota- This is a basic prototype form consisting of text boxes asking for basic information such as email, first and last name, and favorite food
//The goal for the futre is to impliment images, videos, and a code editor to execute programs, as well as processes that allow for consistency 
//when taking in data, for example making sure the first letter is capitalized
function ModalText()
{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [titleLocal, setTitleLocal] = useState('');

  useEffect(() => {
    title = titleLocal;
  }, [titleLocal]);

  const handleTitleChange = event => {
    setTitleLocal(event.target.value);
    title = titleLocal;
  }


  return(
    <>
    <Button variant="primary" onClick={handleShow}>
      Create a Text Question Here!
    </Button><Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Creating Text Question:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text"
                onChange={event => handleTitleChange(event)} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="Primary" type="submit" onClick={textUpdate}>Create</Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

function ModalMulti()
{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [optionOneValueLocal, setOptionOneValueLocal] = useState('');
  const [optionTwoValueLocal, setOptionTwoValueLocal] = useState('');
  const [multiOptionRenderLocal, setMultiRender] = useState('');

  useEffect(() => {
    optionValueOne = optionOneValueLocal;
  }, [optionOneValueLocal]);

  useEffect(() => {
    optionValueTwo = optionTwoValueLocal;
  }, [optionTwoValueLocal]);

  useEffect(() => {
    multiOptionRender = multiOptionRenderLocal;
  }, [multiOptionRenderLocal]);

  const handleOptionOneChange = event =>{
    setOptionOneValueLocal(event.target.value);
    optionValueOne = optionOneValueLocal;
  }

  const handleOptionTwoChange = event =>{
    setOptionTwoValueLocal(event.target.value);
    optionValueTwo = optionTwoValueLocal;
  }

  const handleMultiRenderChange = event => {
    setMultiRender(event.target.value);
    multiOptionRender = multiOptionRenderLocal;
  }
  return(
    <>
    <Button variant="primary" onClick={handleShow}>
          Create a Multiple Choice Question Here!
        </Button>
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Creating a Multiple Choice Question:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Label>Option Type</Form.Label>
            <Form.Select id = "optionOneLocal" onChange={event => handleMultiRenderChange(event)}>
              <option>Choose how the question is rendered</option>
              <option value="RADIO">Radio</option>
              <option value="CHECKBOX">Checkbox</option>
              <option value="DROP_DOWN">Drop-down</option>
            </Form.Select>
            <Form.Label>Option 1</Form.Label>
            <Form.Control type = "text" onChange = {event => handleOptionOneChange(event)}/>
            <Form.Label>Option 2</Form.Label>
            <Form.Control type = "text" onChange = {event => handleOptionTwoChange(event)}/>
            
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="Primary" type="submit" onClick={multiUpdate}>Create</Button>
          </Modal.Footer>
        </Modal>
      </>
  );
}

function ModalScale()
{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [highLabelLocal, setHighLabelLocal] = useState('');
  const [lowLabelLocal, setLowLabelLocal] = useState('');
  const [highValueLocal, setHighValueLocal] = useState('');
  const [lowValueLocal, setLowValueLocal] = useState('');
  const [scaleTitleLocal, setScaleTitleLocal] = useState('');

  useEffect(() => {
    highLabel = highLabelLocal;
    console.log("highlabel changed!");
  }, [highLabelLocal]);

  useEffect(() => {
    lowLabel = lowLabelLocal;
  }, [lowLabelLocal]);

  useEffect(() => {
    highValue = highValueLocal;
  }, [highValueLocal]);

  useEffect(() => {
    lowValue = lowValueLocal;
  }, [lowValueLocal]);

  useEffect(() => {
    scaleTitle = scaleTitleLocal;
  }, [scaleTitleLocal]);


  const handleHighLabelChange = event => {
    setHighLabelLocal(event.target.value);
    highLabel = highLabelLocal;
  }

  const handleLowLabelChange = event => {
    setLowLabelLocal(event.target.value);
    lowLabel = lowLabelLocal;
  }

  const handleHighValueChange = event => {
    setHighValueLocal(event.target.value);
    highValue = highValueLocal;
  }

  const handleLowValueChange = event => {
    setLowValueLocal(event.target.value);
    lowValue = lowValueLocal;
  }

  const handleScaleTitleChange = event => {
    setScaleTitleLocal(event.target.value);
    scaleTitle = scaleTitleLocal;
  }


  return(
    <>
    <Button variant="primary" onClick={handleShow}>
      Create a Scale Question Here!
    </Button><Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Creating Scale Question:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type = "text" onChange = {event => handleScaleTitleChange(event)}/>
            <Form.Label>High Label</Form.Label>
            <Form.Control id = "highLabelLocal" type = "text" onChange = {event => handleHighLabelChange(event)}/>
            <Form.Label>Low Label</Form.Label>
            <Form.Control id = "lowLabelLocal" type = "text" onChange ={event => handleLowLabelChange(event)}/>
            <Form.Label>High value</Form.Label>
            <Form.Control id = "highValueLocal" type = "text" onChange={event => handleHighValueChange(event)}/>
            <Form.Label>Low value</Form.Label>
            <Form.Control id = "lowValueLocal" type = "text" onChange={event => handleLowValueChange(event)}/>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="Primary" type="submit" onClick={scaleUpdate}>Create</Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

function FormPrototype() {
// eslint-disable-next-line
  const [item, setItem] = useState('');

  const [highLabelLocal, setHighLabelLocal] = useState('');
  const [lowLabelLocal, setLowLabelLocal] = useState('');
  const [highValueLocal, setHighValueLocal] = useState('');
  const [lowValueLocal, setLowValueLocal] = useState('');
  const [optionOneValueLocal, setOptionOneValueLocal] = useState('');
  const [optionTwoValueLocal, setOptionTwoValueLocal] = useState('');
  // eslint-disable-next-line
  const [titleLocal, setTitleLocal] = useState('');
  // eslint-disable-next-line
  const [descriptionLocal, setDescriptionLocal] = useState('');
  const [multiOptionRenderLocal, setMultiRender] = useState('');
  const [scaleTitleLocal, setScaleTitleLocal] = useState('');

  useEffect(() => {
    highLabel = highLabelLocal;
    console.log("highlabel changed!");
  }, [highLabelLocal]);

  useEffect(() => {
    lowLabel = lowLabelLocal;
  }, [lowLabelLocal]);

  useEffect(() => {
    highValue = highValueLocal;
  }, [highValueLocal]);

  useEffect(() => {
    lowValue = lowValueLocal;
  }, [lowValueLocal]);

  useEffect(() => {
    title = titleLocal;
  }, [titleLocal]);

  useEffect(() => {
    optionValueOne = optionOneValueLocal;
  }, [optionOneValueLocal]);

  useEffect(() => {
    optionValueTwo = optionTwoValueLocal;
  }, [optionTwoValueLocal]);

  useEffect(() => {
    multiOptionRender = multiOptionRenderLocal;
  }, [multiOptionRenderLocal]);

  useEffect(() => {
    scaleTitle = scaleTitleLocal;
  }, [scaleTitleLocal]);

  const handleTitleChange = event => {
    setTitleLocal(event.target.value);
    title = titleLocal;
  }

  const handleHighLabelChange = event => {
    setHighLabelLocal(event.target.value);
    highLabel = highLabelLocal;
  }

  const handleLowLabelChange = event => {
    setLowLabelLocal(event.target.value);
    lowLabel = lowLabelLocal;
  }

  const handleHighValueChange = event => {
    setHighValueLocal(event.target.value);
    highValue = highValueLocal;
  }

  const handleLowValueChange = event => {
    setLowValueLocal(event.target.value);
    lowValue = lowValueLocal;
  }

  const handleOptionOneChange = event =>{
    setOptionOneValueLocal(event.target.value);
    optionValueOne = optionOneValueLocal;
  }

  const handleOptionTwoChange = event =>{
    setOptionTwoValueLocal(event.target.value);
    optionValueTwo = optionTwoValueLocal;
  }

  const handleMultiRenderChange = event => {
    setMultiRender(event.target.value);
    multiOptionRender = multiOptionRenderLocal;
  }

  const handleScaleTitleChange = event => {
    setScaleTitleLocal(event.target.value);
    scaleTitle = scaleTitleLocal;
  }

 
  const MyForm = () => (
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
    </Form>);
  
  console.log(sessionStorage.getItem("currentFormId"));

   

  return (
    <div>
    
    
    <div>
        <ModalText/>
        <ModalMulti/>
        <ModalScale/>

        
      {/* <Popup trigger={<Button className = "CreateTextQuestion"> Create Text Question</Button>} position="left center">
           <div className = "PopUpBackground">
            <Form.Label>Title</Form.Label>
            <Form.Control type = "text" onChange={event => handleTitleChange(event)}/>
            <Button variant="Primary" type="submit" onClick={textUpdate}>Create</Button>
           </div> 
      </Popup>

      <Popup trigger={<Button className = "CreateMultiQuestion"> Create Multi-choice Question</Button>} position="left center">
           <div className = "PopUpBackground">
            <Form.Label>Option Type</Form.Label>
            <Form.Select id = "optionOneLocal" onChange={event => handleMultiRenderChange(event)}>
              <option>Choose how the question is rendered</option>
              <option value="RADIO">Radio</option>
              <option value="CHECKBOX">Checkbox</option>
              <option value="DROP_DOWN">Drop-down</option>
            </Form.Select>
            <Form.Label>Option 1</Form.Label>
            <Form.Control type = "text" onChange = {event => handleOptionOneChange(event)}/>
            <Form.Label>Option 2</Form.Label>
            <Form.Control type = "text" onChange = {event => handleOptionTwoChange(event)}/>
            <Button variant="Primary" type="submit" onClick={multiUpdate}>Create</Button>
           </div> 
      </Popup>

      <Popup trigger={<Button className = "CreateScaleQuestion"> Create Scale Question</Button>} position="left center">
           <div className = "PopUpBackground">
            <Form.Label>Title</Form.Label>
            <Form.Control type = "text" onChange = {event => handleScaleTitleChange(event)}/>
            <Form.Label>High Label</Form.Label>
            <Form.Control id = "highLabelLocal" type = "text" onChange = {event => handleHighLabelChange(event)}/>
            <Form.Label>Low Label</Form.Label>
            <Form.Control id = "lowLabelLocal" type = "text" onChange ={event => handleLowLabelChange(event)}/>
            <Form.Label>High value</Form.Label>
            <Form.Control id = "highValueLocal" type = "text" onChange={event => handleHighValueChange(event)}/>
            <Form.Label>Low value</Form.Label>
            <Form.Control id = "lowValueLocal" type = "text" onChange={event => handleLowValueChange(event)}/>
            <Button variant="Primary" type="submit" onClick={scaleUpdate}>Create</Button>
           </div> 
      </Popup> */}
    </div>
    </div>
  );
}

export default FormPrototype;

