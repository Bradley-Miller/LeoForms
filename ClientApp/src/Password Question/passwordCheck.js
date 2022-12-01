import zxcvbn from 'zxcvbn';
import Form from 'react-bootstrap/Form';
import './PasswordStrengthMeter.css';
import "./passwordChecker.css";

function checker() {
    let password = document.getElementById("user_password");
    let colorDiv = document.getElementById("color-div");
  
    password.addEventListener("input", function() {
      let val = password.value;
      let result = zxcvbn(val).score;
  // eslint-disable-next-line
      switch (result) {
        case 0:
            colorDiv.style.backgroundColor = "red";
            break;
  
        case 1:
            colorDiv.style.backgroundColor = "rgb(255, 123, 0)";
            break;
  
        case 2:
            colorDiv.style.backgroundColor = "rgb(255, 217, 0)";
            break;
  
        case 3:
            colorDiv.style.backgroundColor = "rgb(119, 255, 0)";
            break;
  
        case 4:
            colorDiv.style.backgroundColor = "green";
            break;
      }
    });
}

function PasswordCheck() {
    return (
        // <div class="mainDiv">
        //     <label class="passLabel">Check your password</label>

        //     <input type="password" class="passLabel" id="user_password" onFocus={checker}></input>
        //     <div class="colorDiv" id="color-div">
        //         <p></p>
        //     </div>
        // </div>

<div class = "passBorder">
    <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label className = "passHeader">Please enter in a password here if you want to check it's strength:</Form.Label>
        <Form.Control type="password" id="user_password" placeholder="Enter password" onFocus={checker}></Form.Control>
    </Form.Group>

    <div class="colorDiv" id="color-div">
                 <p></p>
    </div>
</div>
       
    );
}

export default PasswordCheck;