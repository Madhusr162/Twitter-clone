import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux"
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Card = (props) => {
    const [showReply, setShowReply] = useState(false);
    const [image, setImage] = useState(false);
    const [Comment,setComment]=useState("");
    // const[tweetDetail, setTweetDetail]=useState({})
    const handleReplyClose = () => setShowReply(false);
    const handleReplyShow = () => setShowReply(true);
    
    const data=useSelector(state=>state.userReducer);
    const userData=data.user;


    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "Application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhYzZkN2I2YjVlMGVhYmE4YWM5MmQiLCJpYXQiOjE2OTUyMjI0MTN9.9mF4MdiBMByx9sCSY8SruZ1GbV1HE_LZSIRXNt8sxBs"
    }
}
    

    // const showDetail=(tweet)=>{
    //     setTweetDetail(tweet);

    // }
    const tweetLikeDislike= async (tweetId)=>{
        // console.log(tweetId);
        const response = await axios.put(`${API_BASE_URL}/tweet/${tweetId}/like`, CONFIG_OBJ);
        console.log(response);
        if (response.status === 200) {
            props.getAllTweet();
            toast.success("Liked tweet");
        }
    }
    
    // const submitComment=async(tweetId)=>{
    //     const request={"ReplyText": Comment}
    //     const response = await axios.put(`${API_BASE_URL}/tweet/${tweetId}/reply`, request, CONFIG_OBJ);
    //     if (response.status === 200) {
    //         setComment(response.data);
    //         props.getAllTweet();
    //         toast.success("commmented tweet");
    // onClick={submitComment(props.tweet._id)}
    // }
    
    return (
        <>
            <div className='card mb-3' style={{ width: "95%" }} >
                <div class="card-body">
                    <h5 class="card-title text-start"> <Link to="/UserProfile" onClick={()=>props.getUserTweets(props.tweet.TweetedBy._id)} ><FontAwesomeIcon icon={faUser} className='mt-4 mb-2 me-2' />{props.tweet.TweetedBy.UserName} </Link><span className='p-2 text-muted'>- {props.tweet.createdAt}</span>
                    {props.tweet.TweetedBy._id===userData.id?<FontAwesomeIcon icon={faTrashCan} className='float-end' onClick={()=>props.deleteTweet(props.tweet._id)} style={{cursor:"pointer"}}/>:''}</h5>
                    <p class="card-text text-start">{props.tweet.Content}</p>
                    <img src={props.tweet.Image} alt={props.tweet.Content} className='img-fluid'  />
                    <div className='card-end d-flex justify-content-around'>
                    <button type="button"  style={{ border: "none", backgroundColor: "white" }} onClick={()=>tweetLikeDislike(props.tweet._id)}><FontAwesomeIcon icon={faHeart} className='like my-3'  />{props.tweet.Likes.length}</button>
                    <button type="button" onClick={handleReplyShow} style={{ border: "none", backgroundColor: "white" }}><FontAwesomeIcon icon={faComment} className='comment my-3' /></button>
                    <button type="button" style={{ border: "none", backgroundColor: "white" }}><FontAwesomeIcon icon={faRetweet} className='retweet my-3' /></button>
                    {/* {Comment.map((comment)=>{
                            return(<div className='row'>
                        <div className='col-12'>
                            <p>{comment.ReplyText}</p>
                        </div>
                    </div>)
                    })} */}
                    </div>
                </div>
                <Modal show={showReply} onHide={handleReplyClose} size="md" centered>
                <Modal.Header closeButton>
                    <span className='fw-bold fs-5'>Tweet your reply</span>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col mb-3'>
                            <textarea onChange={(e)=>setComment(e.target.value)} className="form-control" placeholder="Write your Tweet" rows="5" cols="5" id="floatingTextarea"></textarea>
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
