import SideBar from '../Component/SideBar';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import './Profile.css'
import dhoni from '../Images/dhoni.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
const Profile = () => {
    const [showUpload, setShowUpload] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleUploadClose = () => setShowUpload(false);
    const handleUploadShow = () => setShowUpload(true);

    const handleUpdateClose = () => setShowUpdate(false);
    const handleUpdateShow = () => setShowUpdate(true);

    return (
        <>
            <div className='w-75 mx-auto mt-3'>
                <div className="container" style={{ width: "100%" }}>
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
                                    <h4>John Doe</h4>
                                </div>
                                <div className='d-flex ms-4'>
                                    <div className='text-muted'>@johndoe</div>
                                </div>
                                <div className='d-flex my-3 ms-4'>
                                    <FontAwesomeIcon icon={faCalendar} className='me-3' />  <div className='me-5'>DOB: Thurs, Feb 16, 1995</div>
                                    <FontAwesomeIcon icon={faLocationDot} className='me-3' />Location: India
                                </div>
                                <div className='d-flex mb-2 ms-4'>
                                <FontAwesomeIcon icon={faCalendarDays} className='me-3' />Joined Sat, June 16, 2022
                                </div>
                                <div className='d-flex my-3 ms-4 fw-bold'>
                                <div className='me-3'>1 Following</div> 150k Followers
                                </div>
                                <div className='d-flex my-3 fw-bold justify-content-center'>
                                Tweets and Replies
                                </div>
                            </div>
                        </div>
                    </div>

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
                    <hr/>
                    <div className='row' >
                        <div className='col-md-6 col-sm-12 mb-3' style={{marginLeft:"250px"}}>
                            <button type="button" class="btn btn-secondary me-2 " onClick={handleUploadClose}>Close</button>
                            <button type="button" class="btn btn-primary" >Save profile pic</button>
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
                            <input type="text" className='form-control mb-3'/>
                            <label>Location</label>
                            <input type="text" className='form-control mb-3'/>
                            <label>Date Of Birth</label>
                            <input type="date" className='form-control mb-3'/>
                        </div>
                    </div>
                    <hr/>
                    <div className='row' >
                        <div className='col-md-6 col-sm-12 mb-3' style={{marginLeft:"320px"}}>
                            <button type="button" class="btn btn-secondary me-2 " onClick={handleUpdateClose}>Close</button>
                            <button type="button" class="btn btn-primary" >Edit</button>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
            </div>
        </>
    )
}
export default Profile;