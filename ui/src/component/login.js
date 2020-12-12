
import React from 'react';
import {post,validator} from '../service/httpmodel';
import '../styles/login.css';

const Login =  (props) => {

    const [emailError,setEmailError] = React.useState("");
    const [passwordError,setPasswordError] = React.useState("");
    const [loginError,setLoginError] = React.useState("");
    let loginBtn = null;
    

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
            "password" : parentWrapper.querySelector("#password-input").value.trim()
        };
        if(!payload.username){
            setEmailError("Email is mendatory (*)");
            return;
        }else if(!payload.password){
            setPasswordError("Password is mendatory (*)");
            return;
        }
        processLogin(payload);
    }

    const processLogin =  (payload) =>{
        post({payload,url:"/login"}).then((res)=>{
            if(res.data && res.status === 200){
                window.appConfig = {
                    token : res.data.token
                };
                props.history.push('/dashboard');
            }
        }).catch((err)=>{
            setLoginError("User name or password are not valid!");
        });
       
        // const {token} = res || {};
        // if(!err && token){
        //     props.history.push('/dashboard')
        // }else{
        //     setLoginError("Login failed");
        // }
    }


    const keyUpHandler = (event) =>{
        if(event.code === "Enter"){
            loginBtn.click();
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
                {errorMessage(passwordError || loginError)}
            <button className="get-start-btn" ref={e=>loginBtn = e} onClick={doProcessLogin} disabled={(emailError || passwordError) ? true : false}>Login</button>
            <div style={{marginTop:'10px'}}>
                If don't have an account, Please signup <a href="/signup">Signup</a>
            </div>
        </div>
    );
}

export default Login;
