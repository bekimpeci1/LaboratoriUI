import React, {ChangeEvent, CSSProperties, FC, useContext, useEffect, useState} from 'react'
import {useRouter} from "next/router"
import Image from "next/image"
import UserClass from "../Classes/UsersClass"
import {JwtToken} from "../Context/JWTTokenContext"
import {ApiURL} from "../Context/ApiURL"
import Link from 'next/link'

const  Login : FC = () => {

  const centerStyle : CSSProperties = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '30%',
    height: '40%'
  }

  const [user, setUser] = useState<UserClass>(new UserClass());
  const router = useRouter();
  const {jwtToken,setJwtToken} = useContext(JwtToken);
  const apiUrl = useContext(ApiURL);
  useEffect(() => {
    if(jwtToken !== ''){
      router.push("/WelcomePage");
    }
  },[jwtToken])


  const onsubmit = async e =>{
    e.preventDefault();
    const response = await fetch(`${apiUrl}/auth/CheckUserCredentials`,{
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: user.username,
        password: user.Password
      })
    })
    const model = await response.json()
  if(!model.isAuthanticated) {
    document.getElementById('incorrectCredentials').classList.remove("d-none")
  } else {
      setJwtToken(model.jwtToken);
      localStorage.setItem("jwt",model.jwtToken);
    }
  }
 


  return(
        <div className="container">
     
     <form style={centerStyle} onSubmit={onsubmit} method="post">
   <div className="row">
   {/* <img src="/HealthClinic" className="col-8 offset-3" style={{width: '45%', height: '40%'}}/> */}
   <div className='col-3'></div>
   <Image src="/HealthClinic.svg"  width={300} height={250} />
 
   <h3 className="col-10 offset-4">Health Clinic</h3>
   </div>
   <div className="row">
     <div className="col-12 mb-4 mt-2">
       <label style={{fontSize:'1.2rem'}}>Username</label>
       <input type="text" name="" onChange={(e : ChangeEvent<HTMLInputElement>)  => user.username = e.target.value } id="username" className="form-control" style={{height: '80%'}}/>
     </div>
     <div className="col-12 mb-4">
       <label style={{fontSize:'1.2rem'}}>Password</label>
       <input type="password" name=""  id="password" onChange={e => user.Password = e.target.value}className="form-control" style={{height: '80%'}}/>
     </div>
     <p className='text-danger d-none text-center' id="incorrectCredentials">Username and password do not match</p>
   </div>
     <button type="submit"   id="loginBtn" style={{width: '100%', height: '15%',fontSize: '1.5rem'}} className="btn btn-primary mt-2 ">Sign in</button>
   
   </form>

   <div>
  <Link href="/" locale="en">
    <a className="">English</a>
  </Link>
  <br/>
  <Link href="/" locale="al">
    <a className="">Shqip</a>
  </Link>
</div>

   
 </div>
  
  )
}

export default Login