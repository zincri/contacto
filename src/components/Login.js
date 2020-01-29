import React, { useState, useEffect } from 'react';
import {CallApi, useFetch} from '../helpers/ApiService.js';
import './../css/Login.scss';

const Login = props => {

const [datos, setDatos] = useState({
email: "",
password: ""
})

const handleInput = e => {
    const value = e.target.value;
    const name = e.target.name;
    //console.log(e.target.name+" "+e.target.value);
    setDatos({
        ...datos,[name]: value
    })
    
    
}
async function handleSubmit(e) {

    e.preventDefault();
    
    
        try {
            let config = {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(datos)
            }
            let res = await fetch('http://127.0.0.1:8000/api/login',config);
            let data = await res.json();
            console.log(res);
             if(res.status!==200){
                console.log(res.statusText);
            }
            else{
                props.onSendData(data);//AQUI SE LO VAS A MANDAR AL APP
            }

          }catch (error) {
              console.log(error);
        } 
/* 
        //Solicitud con axios

         axios.post(`http://127.0.0.1:8000/api/login`, datos , headers)
        .then(res => {
            if(res.status!==200){
                console.log(res.statusText);
            }
            else{
                props.onSendData(res.data);//AQUI SE LO VAS A MANDAR AL APP
            }
        })
        .catch( error => {
            console.log(error);
        })  */

}

/* function handleSubmit(e) {

    e.preventDefault();
    const res = useFetch('http://127.0.0.1:8000/api/login',{},'POST',datos);
} */
//const submitAction = (e) => {e.preventDefault(); const res = useFetch('http://127.0.0.1:8000/api/login',{},'POST',datos)}

return (
<>

    <div className="form">
        <div className="form-toggle"></div>
        <div className="form-panel one">
            <div className="form-header">
                <h1>
                    Account Login
                </h1>
            </div>
            <div className="form-content">
                <form
                    onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label><input onChange={handleInput} name="email" required="" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label><input onChange={handleInput} name="password" required="" type="password" />
                    </div>
                    <div className="form-group">
                        <label className="form-remember"><input type="checkbox" />Remember Me</label><a
                            className="form-recovery" href="#">Forgot Password?</a>
                    </div>
                    <div className="form-group">
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="form-panel two">
            <div className="form-header">
                <h1>
                    Register Account
                </h1>
            </div>
            <div className="form-content">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label><input name="username" required="" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label><input name="password" required="" type="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword">Confirm Password</label><input id="cpassword" name="cpassword"
                            required="" type="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label><input id="email" name="email" required=""
                            type="email" />
                    </div>
                    <div className="form-group">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div className="pen-footer">
        <a href="https://www.behance.net/gallery/30478397/Login-Form-UI-Library" target="_blank"><i
                className="material-icons">arrow_backward</i>View on Behance</a><a
            href="https://github.com/andyhqtran/UI-Library/tree/master/Login%20Form" target="_blank">View on Github<i
                className="material-icons">arrow_forward</i></a>
    </div>
</>
)

}
export default Login;