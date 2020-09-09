import React, {useState} from "react";
import image from '../images/friends2.jpg';
import {axiosWithAuth} from "../utils/axiosWithAuth";
import styled from 'styled-components';


const LogIn = (props) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    }) 

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
    }

    const Login = e => {
        e.preventDefault();
        axiosWithAuth()
        .post("/api/login", credentials)
        .then(res => {
            window.localStorage.setItem("token", res.data.payload);
            props.history.push("/friends");
        })
        .catch(err => console.log({err}))


    }
    return(
        <Logging>
            <img src={image} width="80%" />
            <h1> Login!</h1>
            <div className="logMe">
                <form onSubmit={Login}>
                    <label htmlFor="username">
                        <input 
                            name="username"
                            type="text"
                            placeholder="username"
                            id="username"
                            onChange={handleChange}
                            value={credentials.username}
                        />
                    </label>
                    <br />
                    <br/>
                    <label htmlFor="password">
                        <input 
                            name="password"
                            type="password"
                            placeholder="password"
                            id="password"
                            onChange={handleChange}
                            value={credentials.password}
                        />
                    </label>
                    <br/>
                    <br />
                    <label>
                        <button>
                            Sign In
                        </button>
                    </label>
                </form> 
            </div> 
        </Logging>
    )

}

const Logging = styled.div`
    background-color:black;
    width:95vw;
    margin:0 auto;
    text-align:center;

    h1{
        color:hotpink;
    }
    .logMe{
        background-color:hotpink;
        opacity:0.8;
        width:30%;
        padding:2%;
        margin:0 auto;
        border-radius:5px;
    }
`
export default LogIn;