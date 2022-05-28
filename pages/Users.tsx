import React, {useContext, useEffect, useState,useRef} from "react"
import NavBar from "../Componets/Navbar"
import Loader from "../Componets/Loader"
import UserClass from "../Classes/UsersClass"
import axios from "axios";
import {JwtToken} from "../Context/JWTTokenContext";
import {ApiURL} from "../Context/ApiURL";
import AddUserModal from "../Modals/AddUserModal";
import EditDelete from "../Componets/EditDeleteComponets"
import SuccessToast from "../Componets/SuccessToast"
import ErrorToast from "../Componets/FailedToast";
import { useRouter } from 'next/router';
import { en } from '../locales/en';
import { al } from '../locales/al';
const Users = () => {
    const [userList, setUserList] = useState<UserClass[]>([])
    const [loading, setloading] = useState<boolean>(true)
    const {jwtToken} = useContext(JwtToken);
    const [showModal,setShowModal] = useState<boolean>(false)
    const [userId,setUserId] = useState(0)
    const toast = useRef(null)
    const apiUrl = useContext(ApiURL);

    const router = useRouter();
    const t = router.locale === 'en' ? en : al;

        const fetchData = async () : Promise<void> => {
        const  response  = await axios.get(`${apiUrl}/user/GetUsersList?pageNumber=${1}`, {
            withCredentials: true,
            headers: {
                Authorization : "Bearer " + localStorage.getItem("jwt")
            }
        })
        const responseJson  = response.data;
        setUserList(responseJson)
        setloading(false);
    }

    const deleteUser = async (userToBeDeleted) => {
        const request = await axios.delete(`${apiUrl}/user/DeleteUserById/${userToBeDeleted}`,{
            withCredentials: true,
            headers: {
                Authorization : "Bearer " + localStorage.getItem("jwt")
            }
        })
        if(request.status == 200) {
            window.location.reload()
            localStorage.setItem("showSuccessToast","true")
        }
        else localStorage.setItem("showSuccessToast","false")

    }

    const showModalOnClick = () => {
            const body = document.querySelector("body");
            body.style.backgroundColor = "rgba(0,0,0,0.2)";

    }

    useEffect( () : void  => {
           fetchData().then(() => {

           })
    },[])

    const openModal = event => {
        event.preventDefault();
        setUserId(0)
        setShowModal(true)
    }

  if(!loading && !showModal) {
    return(
            <NavBar>
                <div id="toastNotification">
                    {localStorage.getItem("showSuccessToast") === "true" && <SuccessToast  />}
                    {localStorage.getItem("showSuccessToast") === "false" && <ErrorToast />}
                </div>
                <div className="container">
                    <div id="headerPart" className="d-flex justify-content-between">
                        <div>
                            <h2 className="mt-3">{t.Users}</h2>
                        </div>
                        <div>
                            <button className="btn add-user-button mt-3 ml-4 background-slide" onClick={openModal} type="button">Add User</button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div id="sideBar" className="col-sm-3 d-flex flex-column justify-content-between">
                            <div
                                className="flex-sm-grow-1 d-flex flex-column shadow-sm p-3 rounded mb-4 align-items-center justify-content-center">
                                <h3>15</h3>
                                <h3>Active</h3>
                            </div>
                            <div
                                className="flex-sm-grow-1 d-flex flex-column mb-4 shadow-sm p-3 rounded align-items-center justify-content-center">
                                <h3 className="text-center">12</h3>
                                <h3 className="text-center">Pending</h3>
                            </div>
                            <div
                                className="flex-sm-grow-1 d-flex flex-column shadow-sm p-3 rounded align-items-center justify-content-center mb-4">
                                <h3 className="text-center">7</h3>
                                <h3 className="text-center">Passive</h3>
                            </div>
                        </div>
                        <div className="col">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th className="text-center">{t.Username}</th>
                                        <th className="text-center">{t.Name}</th>
                                        <th className="text-center">{t.LastName}</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-start">{t.Actions}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userList.map(item => {
                                        return (
                                            <tr key={item.id} style= {{borderBottom: "1px solid lightgray"}}>
                                                <td>
                                                    <img className="rounded-circle" src="assets/img/User.jpeg" width="30px" height="30px" />
                                                </td>
                                                <td className="text-center">
                                                    {item.username}
                                                </td>
                                                <td className="text-center">{item.firstName}</td>
                                                <td className="text-center">{item.lastName}</td>
                                                <td className="active">
                                                    <p className={item.status.toLowerCase()}>{item.status}</p>
                                                </td>
                                                <td className="text-center d-flex flex-row">
                                                    <button className="btn btn-light" type="button"
                                                            onClick={() => {
                                                                setUserId(item.id);
                                                                setShowModal(true)
                                                            }}
                                                    ><i className="fa fa-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-light" onClick={async () => {
                                                        await deleteUser(item.id)
                                                    }} type="button"><i className="fa fa-trash-o"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </NavBar>
  )
  }
  else if(!loading && showModal) {
      return  <AddUserModal  onHide={async () => setShowModal(false)} id={userId} />
  }
  else {
    return (
      <NavBar>
      <Loader />
      </NavBar>
    )
  }


}

export default Users
