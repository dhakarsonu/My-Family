
import React from 'react';
import {post,validator} from '../service/httpmodel';
import '../styles/login.css';

const Signup =  (props) => {

    const [emailError,setEmailError] = React.useState("");
    const [passwordError,setPasswordError] = React.useState("");
    const [loginError,setLoginError] = React.useState("");
    const [firstNameError,setFirstNameError] = React.useState("");
    const [lastNameError,setLastNameError] = React.useState("");
    let signupBtn = null;
    

    const errorMessage = (message) => {
        if(!message)
        return "";

        return (
        <span className="error-msg">{message}</span>
        )
    }

    const doProcessLogin = (event) =>{
        var parentWrapper = event.target.parentElement;
        let payload = {
            'username' : parentWrapper.querySelector("#email-input").value.trim(),
            "password" : parentWrapper.querySelector("#password-input").value.trim(),
            'firstName' : parentWrapper.querySelector("#first-name-input").value.trim(),
            "lastName" : parentWrapper.querySelector("#last-name-input").value.trim()
        };
        if(!payload.username){
            setEmailError("Email is mendatory (*)");
            return;
        }else if(!payload.password){
            setPasswordError("Password is mendatory (*)");
            return;
        }else if(!payload.firstName){
            setFirstNameError("First name is mendatory (*)");
            return;
        }
        else if(!payload.lastName){
            setLastNameError("Last name is mendatory (*)");
            return;
        }
        processSignup(payload);
    }

    const processSignup = (payload) =>{
        post({payload,url:"/signup"}).then((res)=>{
            if(res.data && res.status === 200){
                if(res.data.token){
                    window.appConfig = {
                        token : res.data.token
                    };
                    props.history.push('/dashboard');
                }else{
                    setLoginError("Signup successfully done, Please login");
                }
                
            }
        }).catch((err)=>{
            setLoginError("User name or password are not valid!");
        });
    }


    const keyUpHandler = (event) =>{
        if(event.code === "Enter"){
            signupBtn.click();
            return;
        }
        if(event.target.id === "email-input"){
            if(!event.target.value.trim()){
                setEmailError("Email is mendatory (*)");
            }else if(validator.email(event.target.value.trim())){
                setEmailError("");
            }else{
                setEmailError("Invalid email");
            }
            return;
        }else if(event.target.id === "first-name-input"){
            if(!event.target.value.trim()){
                setFirstNameError("first name is mendatory (*)");
                return;
            }
        }else if(event.target.id === "last-name-input"){
            if(!event.target.value.trim()){
                setLastNameError("last name is mendatory (*)");
                return;
            }
        }
    
        if(!event.target.value.trim()){
            setPasswordError("Password is mendatory (*)");
        }else if(validator.password(event.target.value.trim())){
            setPasswordError("");
        }else{
            setPasswordError("Invalid password");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="logo">
                <img alt="logo" src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-7/512/Family-icon.png"/>
                <span>My Family</span>
            </div>
            <input type="email" className="login-input" id="email-input" placeholder="Email*" onKeyUp={keyUpHandler}/>
                {errorMessage(emailError)}
            <input type="password" className="login-input" id="password-input"  placeholder="Password*" onKeyUp={keyUpHandler}/>
                {errorMessage(passwordError)}
            <input type="test" className="login-input" id="first-name-input" placeholder="First Name*" onKeyUp={keyUpHandler}/>
                {errorMessage(firstNameError)}
            <input type="text" className="login-input" id="last-name-input"  placeholder="Last Name*" onKeyUp={keyUpHandler}/>
                {errorMessage(lastNameError || loginError)}
            <button className="get-start-btn" ref={e=>signupBtn = e} onClick={doProcessLogin} disabled={(emailError || passwordError || firstNameError || lastNameError) ? true : false}>Signup</button>
            <div style={{marginTop:'10px'}}>
                If already have an account, Please login <a href="/login">Login</a>
            </div>
        </div>
    );
};

export default Signup;
