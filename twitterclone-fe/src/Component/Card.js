import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
const Card = (props) => {
    const [showReply, setShowReply] = useState(false);
    const [image, setImage] = useState(false);
    const handleReplyClose = () => setShowReply(false);
    const handleReplyShow = () => setShowReply(true);
    return (
        <>
            <div className='card mb-3' style={{ width: "95%" }}>
                <div class="card-body">
                    <h5 class="card-title text-start"> <FontAwesomeIcon icon={faUser} className='mt-4 mb-2 me-2' />{props.user} <span className='p-2 text-muted'>{props.tweet.createdAt}</span></h5>
                    <p class="card-text">{props.tweet.Content}</p>
                    {image? <img src={props.tweet.image} alt={props.tweet.Content} className='img-fluid'  />:''}
                    <div className='card-end d-flex justify-content-around'>
                        <FontAwesomeIcon icon={faHeart} className='like my-3' /><button type="button" onClick={handleReplyShow} style={{ border: "none", backgroundColor: "white" }}><FontAwesomeIcon icon={faComment} className='comment my-3' /></button><FontAwesomeIcon icon={faRetweet} className='retweet my-3' />
                    </div>
                </div>
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
                        <div className='col-md-6 col-sm-12 mb-3' style={{ marginLeft: "290px" }}>
                            <button type="button" class="btn btn-secondary me-2 " onClick={handleReplyClose}>Close</button>
                            <button type="button" class="btn btn-primary" >Tweet</button>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
            </div>
        </>
    )
}
export default Card;
