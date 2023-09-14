import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux"
import {toast} from 'react-toastify'
import axios from 'axios';
import { API_BASE_URL } from "../config";

const Login = () => {

    /*Declared variables to login the user with email and password who has already registered*/
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
/*Declared variables to add loading and navigate feature*/
    const dispatch=useDispatch();
    const navigate=useNavigate();

    /*Function to be called when submit button is clicked*/
    const login = async (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { UserName: username, Password: password }
        await axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                console.log(requestData);
                console.log(result);
                /*Checking conditions whether user successfully logged in*/
                if (result.status === 200) {
                    setLoading(false);
                    toast.success("Login successful")
                    /*Updating the user details in localStorage*/
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user))
                    dispatch({type: 'LOGIN_SUCCESS', payload: result.data.result.user})
                   
                    navigate('/home');
                } 
                /*Setting the fields empty after login*/
                setUserName('');
                setPassword('');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                
            })
    }
    return (
        <div className="container-fluid">
            <div className="card shadow mx-auto login">
            { /*Loading feature*/ }
                    {loading ? <div className="col-md-12 mt-3 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : ''}
                <div className="row ">
                    <div className='col-md-4 col-sm-12 welcome-back' style={{backgroundColor: 'rgb(30,144,240)'}}>
                        <h4 className='mt-5 back'>Welcome Back</h4>
                        <FontAwesomeIcon icon={faMessage} className='fa-message'/>
                    </div>
                    <div className='col-md-8 col-sm-12'>
                        <div className="card-body">
                            <h4 className="card-title mt-5 fw-bold text-start">Log In</h4>
                            <form onSubmit={(e)=>login(e)}>
                                <input type="text" className="p-2 mt-4 mb-2 form-control " placeholder='Username' value={username} onChange={(ev) => setUserName(ev.target.value)}/>
                                <input type="password" className="p-2 mb-2 mt-4 form-control " placeholder='Password' value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                                <button type="submit" className="btn btn-dark mb-4 mt-4 d-block">Login</button>
                            </form>
                            Don't have an account?<Link to ="/register"> Register here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;