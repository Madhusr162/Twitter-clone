import { Link } from 'react-router-dom';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css'
const SideBar = () => {
    return (
        <>
            <div className='col-md-4 col-sm-12 mt-3'>
                <div className='sidebar'>
                    <FontAwesomeIcon icon={faMessage} className='icon' />
                    <Link to="/home" className='link'><FontAwesomeIcon icon={faHouse} className='mt-4 mb-2 me-2' /> Home </Link>
                    <Link to="/profile" className='link'><FontAwesomeIcon icon={faUser} className='mt-4 mb-2 me-2' /> Profile </Link>
                    <Link to="/login" className='link'><FontAwesomeIcon icon={faRightFromBracket} className='mt-4 mb-2' /> Log out </Link>
                </div>
                <div className='sidebar-profile' >
                    <FontAwesomeIcon icon={faUser} className='mt-4 mb-2' /> John Doe
                   <div className='text-muted'>@johndoe</div></div>
            </div>
        </>
    )
}
export default SideBar;