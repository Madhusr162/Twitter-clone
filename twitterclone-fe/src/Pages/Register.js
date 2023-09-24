import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useState } from "react";
import { toast } from "react-toastify";
import './Login.css'

const Register = () => {
    const [Name, setName] = useState("");
    const [UserName, setUserName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const register = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData={Name, UserName, Email, Password}
        axios.post(`${API_BASE_URL}/register`, requestData)
            .then((result) => {
                console.log(result.status)
                console.log(Name,Email,UserName)
                /*Checking condition whether user successfully logged in*/
                if(result.status===201){
                    setLoading(false);
                    toast.success("Registered successfull");
                    navigate('/')
                }
                /*Checking condition whether the email id already registered*/
                if(result.status===500){
                    setLoading(false);
                    toast.warning("Already registered");
                }
                 /*Setting the fields empty after registration*/
                setName('');
                setUserName('');
                setEmail('');
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
                    <div className='col-md-4 col-sm-12' style={{backgroundColor: 'rgb(30,144,240)'}}>
                        <h4 className='mt-5 back'>Join Us</h4>
                        <FontAwesomeIcon icon={faMessage} className='fa-message'/>
                    </div>
                    <div className='col-md-8 col-sm-12'>
                        <div className="card-body">
                            <h4 className="card-title mt-5 fw-bold text-start">Register</h4>
                            <form onSubmit={(e) => register(e)}>
                                <input type="text" className="p-2 mt-4 mb-2 form-control " placeholder='Fullname' value={Name} onChange={(ev) => setName(ev.target.value)} />
                                <input type="email" className="p-2 mt-4 mb-2 form-control " placeholder='Email' value={Email} onChange={(ev) => setEmail(ev.target.value)}/>
                                <input type="text" className="p-2 mt-4 mb-2 form-control " placeholder='Username' value={UserName} onChange={(ev) => setUserName(ev.target.value)} />
                                <input type="password" className="p-2 mt-4 mb-2 form-control " placeholder='Password' value={Password} onChange={(ev) => setPassword(ev.target.value)} />
                                <button type="sybmit" className="btn btn-dark mt-4 mb-2 d-block">Register</button>
                            </form>
                            Already registered? <Link to="/login">Login here</Link>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Register;