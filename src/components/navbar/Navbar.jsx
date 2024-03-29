import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate }from "react-router-dom";
import "./Navbar.scss" ; 
import newRequest from "../../utils/newRequests.js" 
// import "../../../src/app.scss"

const Navbar = ()=> {
    const [active,setActive] = useState(false);
    const[open,setOpen] = useState(false);
    const{pathname} = useLocation();

    const navigate = useNavigate();

    const isActive = ()=>{
        window.scrollY > 0 ? setActive(true) :setActive(false)
    }

    useEffect(()=>{
      window.addEventListener("scroll",isActive);

      return () =>{
        window.removeEventListener("scroll",isActive)
      }
    },[]);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const handleLogout = async(e)=>{
      try {
        await newRequest.post("/auth/logout");
        localStorage.setItem("currentUser",null);
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    }

  return (
   <div className={active || pathname!=="/" ? "navbar active":"navbar"}>
        <div className="container">
            <div className="logo">
            < Link className='link' to="/">
            <span  className='text'>fiverr</span >

            </Link>
             <span  className='dot'>.</span >
            </div>
            <div className="links">
                <span  className='link'>Fiverr Business</span >
                <span className='link' >Explore</span >
                <span className='link' >English</span >
                <Link className='link' to={"/login"}>Sign in</Link>
                {!currentUser?.isSeller && <span className='link'>Become a Seller</span >}
                {!currentUser &&<Link className='link' to={"/register"}><button>Join</button></Link>}

                {
                  currentUser && (
                    <div className='user' onClick={()=>setOpen(!open)}>
                      <img src={currentUser.img || "/img/noavatar.jpg"} alt="userimg" />
                      <span>{currentUser?.username}</span>
                     {open && <div className="options">
                        {
                          currentUser.isSeller &&(
                            <>
                            <Link className='link' to={"/mygigs"} >Gigs</Link >
                            <Link className='link' to={"/add"} >Add New Gig</Link >
                            </>
                          )
                        }
                        <Link className='link' to={"/orders"}>Orders</Link >
                        <Link className='link' to={"/messages"}>Messages</Link >
                        <Link className='link' onClick={handleLogout} >Logout</Link >

                      </div>}

                    </div>
                  )
                }

            </div>
        </div>

        { (active || pathname !=="/") && (
            <>
            <hr />

        <div className="menu">
            <Link className='link' to={"/"}>

            </Link>
            <Link className='link' to={"/"}>
             Graphics & Design 
            </Link>
            <Link className='link' to={"/"}>
             Video & Animation
            </Link>
            <Link className='link' to={"/"}>
            Writing & Translation
            </Link>
            <Link className='link' to={"/"}>
            AI Services
            </Link>
            <Link className='link' to={"/"}>
            Digital Marketing 
            </Link>
            <Link className='link' to={"/"}>
             Music & Audio 
            </Link>
            <Link className='link' to={"/"}>
            Programming & Tech 
            </Link>
             
          </div>
          <hr />
             </>
             )}

    </div>
  )
}

export default Navbar;