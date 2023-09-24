
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux"
// import { useEffect } from 'react';
import UserProfile from './Pages/userProfile';
function App() {
  // function DynamicRoutic() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const data=useSelector(state=>state.userReducer);
  //   const userData=data.user;

  //   useEffect(() => {
  //     const userInfo = JSON.parse(localStorage.getItem("user"));
  //     if (userInfo) {
  //       dispatch({ type: "LOGIN_SUCCESS", payload: userData });
  //       navigate("/home")
  //     } else {
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");
  //       dispatch({ type: "LOGIN_ERROR" });
  //       navigate("/login")
  //     }
  //   }, [])
  
  // return (
  //   <Routes>
  //     <Route exact path="/" element={<Login />}></Route>
  //     <Route exact path="/login" element={<Login />}></Route>
  //     <Route exact path="/register" element={<Register />}></Route>
  //     <Route exact path="/home" element={<Home />}></Route>
  //     <Route exact path="/profile" element={<Profile />}></Route>
  //     <Route exact path="/Userprofile" element={<UserProfile />}></Route>
  //   </Routes>
  // )
  // }
  
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/home" element={<Home />}></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route exact path="/Userprofile" element={<UserProfile />}></Route>
    </Routes>
      </Router>
    </div>
  )
}

export default App;
