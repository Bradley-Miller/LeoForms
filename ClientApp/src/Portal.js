import React from "react";
// eslint-disable-next-line
import App from "./App";
import SigninPage from "./App";

function Portal() {
    var profile = SigninPage.profile;
    if(profile.name!= null){
        return (
            <h1>{profile.name}</h1>
        );
        }
    else if(profile.name === "App"){
        return (
            <h1>Username is Null</h1>
        );
    }
}
export default Portal;