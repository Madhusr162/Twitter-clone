import './Home.css'
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import SideBar from '../Component/SideBar';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { toast } from 'react-toastify'
import Card from '../Component/Card';


const Home = () => {
    const [image, setImage] = useState({ preview: '', data: '' })
    const [showPost, setShowPost] = useState(false);
    const [Content, setContent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTweets, setAllTweets] = useState([]);

    const handlePostClose = () => setShowPost(false);
    const handlePostShow = () => setShowPost(true);

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const getAllTweet = async () => {
        console.log("getAllTweets");
        const response = await axios.get(`${API_BASE_URL}/tweet/`, CONFIG_OBJ)
        if (response.status === 200) {
            setAllTweets(response.data.tweets)
        } else {
            toast.warning("Some error occured")
        }
    }
    const handleFileSelect = (event) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0]
        }
        setImage(img);
    }
    const handleImgUpload = async () => {
        let formData = new formData();
        formData.append('file', image.data);

        const response = axios.post(`${API_BASE_URL}/uploadFile`, formData, CONFIG_OBJ)
        return response;
    }
    const addTweet = async () => {
        if (Content === '') {
            toast.warning("Content is mandatory")
        }
        const imgRes = await handleImgUpload();
        //add validation for Content
        const request = { Content: Content, Image: `${API_BASE_URL}/files/${imgRes.data.fileName}` }
        //write api to call the post
        const tweetResponse = await axios.post(`${API_BASE_URL}/tweet`, request, CONFIG_OBJ)
        if (tweetResponse.status === 201) {
            toast.success("Tweeted successful")
        } else {
            toast.warning("Some error occured")
        }
    }
    useEffect(() => {
        getAllTweet();
    }, []);
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
                            {allTweets.map((tweetData)=>{
                            return(
                            <Card tweet={tweetData}/>
                            )
                            }
                        )}

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
                            <textarea onChange={(ev) => setContent(ev.target.value)} className="form-control" placeholder="Write your Tweet" rows="5" cols="5" id="floatingTextarea"></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12 mb-3'>
                            <div className="dropZoneContainer" >
                                <label for="file-upload"><FontAwesomeIcon icon={faImage} /></label>
                                <input type="file" name="file" id="file-upload" className="FileUpload" accept=".jpg,.png,.jpeg" onChange={handleFileSelect} />
                                {image.preview && <img src={image.preview} width='200' height='200' alt="preview" className='img-fluid' />}
                                <br />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='row' >
                        <div className='col-md-6 col-sm-12 mb-3' style={{ marginLeft: "290px" }}>
                            {loading ? <div className="col-md-12 mt-3 text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : ''}
                            <button type="button" class="btn btn-secondary me-2 " onClick={handlePostClose}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => addTweet}>Tweet</button>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>


        </div >

    )
}
export default Home;