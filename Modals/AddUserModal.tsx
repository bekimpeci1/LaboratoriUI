import React, {useContext, useEffect, useState,useRef} from "react";
import Props from "../Interfaces/ModalGeneralProps"
import UserClass from "../Classes/UsersClass";
import axios from "axios";
import {ApiURL} from "../Context/ApiURL";
import {JwtToken} from "../Context/JWTTokenContext";
import { useRouter } from 'next/router';
import { en } from '../locales/en';
import { al } from '../locales/al';
const AddUserModal : React.FC<Props> = ({onHide,id}) => {

    //HOOKS
    const[user,setUserData] = useState<UserClass>(new UserClass())
    const apiUrl = useContext(ApiURL);
    const {jwtToken} = useContext(JwtToken);
    const userNameInput = useRef(null)
    const firstNameInput = useRef(null)
    const lastNameInput = useRef(null)
    const dateOfBirthInput = useRef(null)
    const emailInput = useRef(null)
    //End of hooks

    const router = useRouter();
    const t = router.locale === 'en' ? en : al;
    
    const globalConfiguration = {
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
            "Content-type" :"application/json",
            Accept: "application/json"
        }
    }

    const getUserData = async () => {
        const request = await axios.get(`${apiUrl}/user/GetUserById/${id}`,globalConfiguration);
        const responseJson = await request.data;
        setInputsValuesOnUpdate(responseJson);
        setUserDataOnUpdate(responseJson);
    }

    const setInputsValuesOnUpdate = (responseJson) => {
        userNameInput.current.value = responseJson.username
        firstNameInput.current.value = responseJson.firstName
        lastNameInput.current.value = responseJson.lastName
        dateOfBirthInput.current.value = responseJson.dateOfBirth
        emailInput.current.value = responseJson.email
    }

    const setUserDataOnUpdate = responseJson => {
        user.username = responseJson.username
        user.firstName= responseJson.firstName
        user.lastName = responseJson.lastName
        user.dateOfBirth = responseJson.dateOfBirth
        user.email = responseJson.email
        user.id = responseJson.id
    }

    useEffect(()=>{
        getUserData();
    },[])

    const addUSer = async () => {
        debugger;
        console.log(user)
        const request = await axios.post(`${apiUrl}/user/${id === 0 ? "AddUser" : "UpdateUser"}`,user,globalConfiguration);
        const response = request.data;
        if(request.status ==200)
            localStorage.setItem("showSuccessToast","true")
        else
            localStorage.setItem("showSuccessToast","false")
        window.location.reload()
    }

    window.addEventListener("keyup", e => {
        if(e.key == "Escape") onHide()
    })

    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={onHide}>X </button>
                </div>
                <div className="title">
                    <h2>{t.AddUser}</h2>
                </div>
                <div className="body">
                    <div className="container mt-5">
                        <form>

                            <div className="row">
                                <div className="col-sm-6 mb-1"><label className="form-label">{t.Name}</label>
                                    <input className="form-control input-width" ref={firstNameInput} type="text" onChange={e => user.firstName = e.target.value} />
                                </div>
                                <div className="col-sm-6 mb-1"><label className="form-label">{t.LastName}</label>
                                    <input className="form-control input-width" type="text" ref={lastNameInput}  onChange={e => user.lastName = e.target.value} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 mb-1">
                                    <label className="form-label">{t.DateOfBirth}</label>
                                    <input
                                        className="form-control input-width" ref={dateOfBirthInput} type="date" onChange={e => user.dateOfBirth = e.target.value}/>
                                </div>
                                <div className="col-sm-6 mb-1"><label className="form-label">{t.Username}</label>
                                    <input
                                        className="form-control input-width" ref={userNameInput} type="text" onChange={e => user.username = e.target.value}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 mb-1">
                                    <label className="form-label" >{t.Password}</label>
                                    <input
                                        className="form-control input-width" type="password" onChange={e => user.Password = e.target.value}/>
                                </div>
                                <div className="col-sm-6"><label className="form-label">Email</label>
                                    <input className="form-control input-width" type="text" ref={emailInput} onChange={e => user.email = e.target.value} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 mb-1"><label className="form-label">Role</label>
                                    <select className="form-select input-width">
                                        <optgroup label="This is a group">
                                            <option value="12" >This is item 1</option>
                                            <option value="13">This is item 2</option>
                                            <option value="14">This is item 3</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="footer">
                    <button onClick={addUSer}>{t.Save}</button>
                </div>
            </div>
        </div>

    )
}


export default AddUserModal