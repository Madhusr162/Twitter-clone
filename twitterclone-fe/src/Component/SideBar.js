import { Link } from 'react-router-dom';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './SideBar.css'
const SideBar = () => {
    /*Declared variables to for dispatch and navigate feature*/
    const dispatch = useDispatch();

    const data=useSelector(state=>state.userReducer);
    const userData=data.user;
    const navigate = useNavigate();
    //console.log(user);
    const logout = () => {
        toast.success("Logged out!")
        
        /*Removing the user details from local storage after logout*/
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/login")
    }
    return (
        <>
            <div className='col-md-4 col-sm-12 mt-3'>
                <div className='sidebar'>
                    <FontAwesomeIcon icon={faMessage} className='icon' />
                    <Link to="/home" className='link'><FontAwesomeIcon icon={faHouse} className='menu mt-4 mb-2 me-2' /> Home </Link>
                    <Link to="/profile" className='link'><FontAwesomeIcon icon={faUser} className='menu mt-4 mb-2 me-2'/> Profile </Link>
                    <Link to="/login" className='link'><FontAwesomeIcon icon={faRightFromBracket} className='menu mt-4 mb-2' onClick={logout} /> Log out </Link>
                </div>
                <div className='sidebar-profile' >
                    <FontAwesomeIcon icon={faUser} className='mt-4 mb-2' /> {userData.Name}
                    <div className='text-muted'>@{userData.UserName}</div></div>
            </div>
        </>
    )
}
export default SideBar;