import React from "react";
import Popup from "reactjs-popup";

function modal() {
    return (
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
      <span> Modal content </span>
    </Popup>
  );
    }
  export default modal;