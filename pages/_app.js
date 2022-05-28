import '../styles/globals.css'
import Head from "next/head"
import "../styles/Navbar.css"
import "../styles/Users.css"
import "../styles/Paging.css"
import "../public/assets/fonts/font-awesome.min.css"
import {useState} from 'react'
import {JwtToken} from "../Context/JWTTokenContext"
import "../ModalStyles/AddUserModal.css"
import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp({ Component, pageProps }) {
  const [jwtToken, setJwtToken] = useState('')

  const changeJwtToken = param => setJwtToken(param)
  return (
<>
  <Head>
  <link
href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
crossOrigin="anonymous" 
/>
<script
src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
crossOrigin="anonymous"></script>
  </Head>
  <JwtToken.Provider value={{
    jwtToken,
    setJwtToken
  }}>
      <Component {...pageProps} /> 
  </JwtToken.Provider>
  </>  )
 
}



export default MyApp
