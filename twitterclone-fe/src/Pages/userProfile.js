import SideBar from '../Component/SideBar';
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

const UserProfile = () => {
    const [userTweets, setUserTweets]=useState([]);
    const [user, setUser] = useState("");

    const data = useSelector(state => state.userReducer);
    const userData = data.user;

    const navigate = useNavigate();

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }


    const getUserTweets = async (userId) => {
        console.log("getUserTweets");
        const response = await axios.get(`${API_BASE_URL}/user/${userId}/tweets`, CONFIG_OBJ)
        if (response.status === 200) {
            setUserTweets(response.data.tweets)
        } else {
            toast.warning("Some error occured")
        }
    }
    useEffect(() => {
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
                                    <button type="button" class="btn btn-dark">Follow</button>
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
                                        {userTweets.map((tweetData) => {
                                            return (
                                                <Card tweet={tweetData} getUserTweets={getUserTweets} />
                                            )
                                        }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        </>
    )
}
export default UserProfile;