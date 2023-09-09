import './Home.css'
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'
import SideBar from '../Component/SideBar';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import bridge from '../Images/GoldenGateBridge-001.jpg'


const Home = () => {
    const [showPost, setShowPost] = useState(false);
    const [showReply, setShowReply] = useState(false);

    const handlePostClose = () => setShowPost(false);
    const handlePostShow = () => setShowPost(true);

    const handleReplyClose = () => setShowReply(false);
    const handleReplyShow = () => setShowReply(true);
    return (
        <div className='w-75 mx-auto mt-3'>
            <div className="container" style={{ width: "100%" }}>
                <Scrollbars style={{ width: "100%", height: 900 }}>
                    <div className='row'>
                        <SideBar />
                        <div className='col-md-8 col-sm-12'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h4 className=''>Home</h4>
                                <button type="button" class="btn btn-info me-5 my-2" onClick={handlePostShow}>Tweet</button>
                            </div>
                            <div className='card mb-3' style={{ width: "95%" }}>
                                <div class="card-body">
                                    <h5 class="card-title text-start"> <FontAwesomeIcon icon={faUser} className='mt-4 mb-2 me-2' />Ronaldo <span className='p-2 text-muted'>- Fri Jan 15, 2023</span></h5>
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <img src={bridge} alt="golden gate bridge" className='img-fluid' />
                                    <div className='card-end d-flex justify-content-around'>
                                        <FontAwesomeIcon icon={faHeart} className='like my-3' /><button type="button" onClick={handleReplyShow} style={{border:"none", backgroundColor:"white"}}><FontAwesomeIcon icon={faComment} className='comment my-3' /></button><FontAwesomeIcon icon={faRetweet} className='retweet my-3' />
                                    </div>
                                </div>
                            </div>
                            <div className='card mb-3' style={{ width: "95%" }}>
                                <div class="card-body">
                                    <h5 class="card-title text-start"> <FontAwesomeIcon icon={faUser} className='mt-4 mb-2 me-2' />Ronaldo <span className='p-2 text-muted'>- Fri Jan 15, 2023</span></h5>
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <img src={bridge} alt="golden gate bridge" className='img-fluid' />
                                    <div className='card-end d-flex justify-content-around'>
                                        <FontAwesomeIcon icon={faHeart} className='like my-3' /><button type="button" onClick={handleReplyShow} style={{border:"none", backgroundColor:"white"}}><FontAwesomeIcon icon={faComment} className='comment my-3' /></button><FontAwesomeIcon icon={faRetweet} className='retweet my-3' />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Scrollbars>
            </div>
            <Modal show={showPost} onHide={handlePostClose} size="md" centered>
                <Modal.Header closeButton>
                    <span className='fw-bold fs-5'>New Tweet</span>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col mb-3'>
                            <textarea className="form-control" placeholder="Write your Tweet" rows="5" cols="5" id="floatingTextarea"></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12 mb-3'>
                            <div className="dropZoneContainer">
                                <label for="file-upload"><FontAwesomeIcon icon={faImage} /></label>
                                <input type="file" name="file" id="file-upload" />
                                <br />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='row' >
                        <div className='col-md-6 col-sm-12 mb-3' style={{marginLeft:"290px"}}>
                            <button type="button" class="btn btn-secondary me-2 " onClick={handlePostClose}>Close</button>
                            <button type="button" class="btn btn-primary" >Tweet</button>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>

            <Modal show={showReply} onHide={handleReplyClose} size="md" centered>
                <Modal.Header closeButton>
                    <span className='fw-bold fs-5'>Tweet your reply</span>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col mb-3'>
                            <textarea className="form-control" placeholder="Write your Tweet" rows="5" cols="5" id="floatingTextarea"></textarea>
                        </div>
                    </div>
            
                    <div className='row' >
                        <div className='col-md-6 col-sm-12 mb-3' style={{marginLeft:"290px"}}>
                            <button type="button" class="btn btn-secondary me-2 " onClick={handleReplyClose}>Close</button>
                            <button type="button" class="btn btn-primary" >Tweet</button>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
        </div >

    )
}
export default Home;