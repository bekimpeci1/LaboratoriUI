import React from "react"
import Image from "next/image"
import Link from "next/link"

const NavBar = props => {


    const linkStyle = {
        color:'black',
        textDecoration: 'none'
    }

    return(
        <div id="mainDiv">

          <div id="navbarDiv" className="card" >
              <div id="LogoAndName">
              <Image src="/HealthClinic.svg" width={200} height={100} />
          <h4 className="text-center">Health Clinic</h4>
              </div>


                <ul id="mainNavBar">
                    <li className="text-left ml-2 text-truncate">
                       <Link href="/Users">
                           <a className="navLink" style={linkStyle}>Users</a>
                           </Link>
                        </li>
                    <li className="text-left ml-2 text-truncate">
                        <Link href="/Stocks">
                            <a className="navLink" style={linkStyle}>Stocks</a>
                        </Link>
                    </li>
                    <li className="text-left ml-2 text-truncate">
                        <Link href="/Clients">
                            <a className="navLink" style={linkStyle}>Patients</a>
                        </Link>
                    </li>
                    <li className="text-left ml-2 text-truncate">
                        <Link href="/Analiza">
                            <a className="navLink" style={linkStyle}>Analiza</a>
                        </Link>
                    </li>
                </ul>
                <div id="bottomNav" >
                <img src="/DarkMode.svg" title="Dark Mode"   width={30} height={40} />
                <img src="/LogOut.svg" title="Log out"width={30} height={40} />
                </div>

          </div>
          <div id="mainBody">
              {props.children}
          </div>

       </div>
    )
}


export default NavBar
