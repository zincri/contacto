import React, { useState } from 'react'
import '../css/LoginForm.css';


const LoginForm = props => {

    const [ussser,setUssser] = useState({
        email:"",
        password:""
    })

    const handleInput = e =>{
        const value = e.target.value;
        const name = e.target.name;

        setUssser({
            ...ussser,[name]:value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        try {
            let config = {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(ussser)
            }
            let res = await fetch('http://127.0.0.1:8000/api/login/',config);
            let data = await res.json();
            //props.onAddTodo(data);
            if (res.status!==200) {
                console.log(res.statusText);
            } else {
                props.onSendData(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
<>
        <div className="main">
            <p className="sign" align="center">Sign in</p>
            <form className="form1" onSubmit={handleSubmit}>
                <input className="un" type="text" align="center" placeholder="Username" name="email" onChange={handleInput}/>
                <input className="pass" type="password" align="center" placeholder="Password" name="password" onChange={handleInput}/>
                <button className="submit" align="center">Sign in</button>
                <p className="forgot" align="center"><a href="#">Forgot Password?</a></p>
            </form>
        </div>
</>
    )



}
export default LoginForm