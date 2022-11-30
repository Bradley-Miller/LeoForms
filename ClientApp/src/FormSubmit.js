import { gapi } from 'gapi-script';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Popup from 'reactjs-popup';
import Row from 'react-bootstrap/esm/Row';
import RangeSlider from 'react-bootstrap-range-slider';
import { useEffect, useState, useReducer } from 'react';
import "./FormSubmitCss.css";


var loadForm = false;


function FormSubmit(){


    if(loadForm === false){
        return(
            <Form>
                <Form.Label>
                    hi
                </Form.Label>
            </Form>
        );
    }
    else{

    }

}

export default FormSubmit