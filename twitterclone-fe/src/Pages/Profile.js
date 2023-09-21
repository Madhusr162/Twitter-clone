import SideBar from '../Component/SideBar';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from "react";
import './Profile.css'
import dhoni from '../Images/dhoni.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import Card from '../Component/Card';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';

const Profile = () => {
    const [showUpload, setShowUpload] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [myTweets, setMyTweets] = useState([]);
    const [user, setUser] = useState("");
    const [Name, setName] = useState("");
    const [Location, setLocation] = useState("");
    const [DOB, setDOB] = useState("");

    const handleUploadClose = () => setShowUpload(false);
    const handleUploadShow = () => setShowUpload(true);

    const handleUpdateClose = () => setShowUpdate(false);
    const handleUpdateShow = () => setShowUpdate(true);

    const data = useSelector(state => state.userReducer);
    const userData = data.user;

    const navigate = useNavigate();

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const getMyTweets = async () => {
        console.log("getMyTweets");
        console.log(localStorage.getItem("token"))
        const response = await axios.get(`${API_BASE_URL}/mytweet/`, CONFIG_OBJ)
        if (response.status === 200) {
            setMyTweets(response.data.tweets)
        } else {
            toast.warning("Some error occured")
        }
    }
    const putUpdate = async (e) => {
        e.preventDefault();
        console.log("UpdateDetails");
        const requestData={Name: Name, Location: Location, DOB: DOB}
        const userId=userData.id;
        console.log(userId);
        const response = await axios.put(`${API_BASE_URL}/user/${userId}/`,requestData, CONFIG_OBJ)
        if (response.status === 200) {
            toast.success("Details updated!")
        } else {
            toast.warning("Some error occured!")
        }

    }
    useEffect(() => {
        getMyTweets();
        let userInfo = JSON.parse(localStorage.getItem("user"));
        if (!userInfo) {
            navigate("/");
        }
        setUser(userInfo);
    }, []);

    return (
        <>
            <div className='w-75 mx-auto mt-3'>
                <div className="container" style={{ width: "100%" }}>
                    <Scrollbars style={{ width: "100%", height: 900 }}>
                        <div className='row'>
                            <SideBar />
                            <div className='col-md-8 col-sm-12'>
                                <div className='card'>
                                    <div className='d-flex'>
                                        <h4 className=''>Profile</h4>
                                    </div>
                                    <div className='mb-3 ' >
                                        <div className="card-body pic">
                                            <img src={dhoni} alt="M S Dhoni" className='img-fluid dhoni' width="160" />
                                        </div>
                                    </div>
                                    <div className='buttons'>
                                        <button type="button" className="btn btn-outline-primary me-2 " onClick={handleUploadShow}>Upload Profile Picture</button>
                                        <button type="button" className="btn btn-outline-secondary " onClick={handleUpdateShow}>Edit</button>
                                    </div>
                                    <div className='d-flex ms-4'>
                                        <h4>{userData.Name}</h4>
                                    </div>
                                    <div className='d-flex ms-4'>
                                        <div className='text-muted'>@{userData.UserName}</div>
                                    </div>
                                    <div className='d-flex my-3 ms-4'>
                                        <FontAwesomeIcon icon={faCalendar} className='me-3' />  <div className='me-5'>DOB: {userData.DOB}</div>
                                        <FontAwesomeIcon icon={faLocationDot} className='me-3' />Location: {userData.Location}
                                    </div>
                                    <div className='d-flex mb-2 ms-4'>
                                        <FontAwesomeIcon icon={faCalendarDays} className='me-3' />Joined Sat, June 16, 2022
                                    </div>
                                    <div className='d-flex my-3 ms-4 fw-bold'>
                                        <div className='me-3'> Following</div> Followers
                                    </div>
                                    <div className='d-flex my-3 fw-bold justify-content-center'>
                                        Tweets and Replies
                                    </div>
                                    <div className='my-3 justify-content-center'>
                                        {myTweets.map((tweetData) => {
                                            return (
                                                <Card tweet={tweetData} />
                                            )
                                        }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
                <Modal show={showUpload} onHide={handleUploadClose} size="md" centered>
                    <Modal.Header closeButton>
                        <span className='fw-bold fs-5'>Upload Profile Pic</span>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col mb-3 note'>
                                <label >Note: The image should be square in shape</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-sm-12'>
                                <div className="uploadContainer">
                                    <input className="form-control" type="file" id="formFile" />
                                    <br />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='row' >
                            <div className='col-md-6 col-sm-12 mb-3' style={{ marginLeft: "250px" }}>
                                <button type="button" className="btn btn-secondary me-2 " onClick={handleUploadClose}>Close</button>
                                <button type="button" className="btn btn-primary" >Save profile pic</button>
                            </div>
                        </div>


                    </Modal.Body>
                </Modal>

                <Modal show={showUpdate} onHide={handleUpdateClose} size="md" centered>
                    <Modal.Header closeButton>
                        <span className='fw-bold fs-5'>Edit Profile</span>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col mb-3 note'>
                                <label >Name:</label>
                                <input type="text" className='form-control mb-3' onChange={(e) => setName(e.target.value)} />
                                <label>Location</label>
                                <input type="text" className='form-control mb-3' onChange={(e) => setLocation(e.target.value)} />
                                <label>Date Of Birth</label>
                                <input type="date" className='form-control mb-3' onChange={(e) => setDOB(e.target.value)} />
                            </div>
                        </div>
                        <hr />
                        <div className='row' >
                            <div className='col-md-6 col-sm-12 mb-3' style={{ marginLeft: "320px" }}>
                                <button type="button" className="btn btn-secondary me-2 " onClick={handleUpdateClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={putUpdate} >Edit</button>
                            </div>
                        </div>


                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
export default Profile;