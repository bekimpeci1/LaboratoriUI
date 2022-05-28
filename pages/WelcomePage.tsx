import React, {FC, useContext} from "react";
import NavBar from "../Componets/Navbar";
import {JwtToken} from "../Context/JWTTokenContext"

const WelcomingPage : FC = () => {



    const {jwtToken} = useContext(JwtToken);
    return (
      <NavBar>
          <h4>Welcome to the dashboard</h4>
      </NavBar>
    )
}

export default WelcomingPage