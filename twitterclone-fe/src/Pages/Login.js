import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
const Login = () => {

    /*Declared variables to login the user with email and password who has already registered*/
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
/*Declared variables to add loading and navigate feature*/
    const dispatch=useDispatch();
    const navigate=useNavigate();

    /*Function to be called when submit button is clicked*/
    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        const requestData = { email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                /*Checking conditions whether user successfully logged in*/
                if (result.status === 200) {
                    setLoading(false);

                    /*Updating the user details in localStorage*/
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user))
                    dispatch({type: 'LOGIN_SUCCESS', payload: result.data.result.user})
                    Swal.fire({
                        icon: 'success',
                        title: 'user successfully loggedin'
                    })
                    navigate('/addsales');
                } 
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error
                })
            })
    }
    return (
        <div className="container-fluid">
            <div className="card shadow mx-auto login">
                <div className="row ">
                    <div className='col-md-4 col-sm-12 welcome-back' style={{backgroundColor: 'rgb(30,144,240)'}}>
                        <h4 className='mt-5 back'>Welcome Back</h4>
                        <FontAwesomeIcon icon={faMessage} className='fa-message'/>
                    </div>
                    <div className='col-md-8 col-sm-12'>
                        <div className="card-body">
                            <h4 className="card-title mt-5 fw-bold text-start">Log In</h4>
                            <form>
                                <input type="text" className="p-2 mt-4 mb-2 form-control " placeholder='Username' />
                                <input type="password" className="p-2 mb-2 mt-4 form-control " placeholder='Password' />
                                <button type="button" className="btn btn-dark mb-4 mt-4 d-block">Login</button>
                            </form>
                            Don't have an account?<Link to ="/register"> Register here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;