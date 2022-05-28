import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../Componets/Navbar";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import Loader from "../Componets/Loader";
import SuccessToast from "../Componets/SuccessToast";
import ErrorToast from "../Componets/FailedToast";
import AddPatient from "../Modals/AddPatient";
import axios from "axios";
import {ApiURL} from "../Context/ApiURL";
import Patients from "../Classes/Patients";
import { useRouter } from 'next/router';
import { en } from '../locales/en';
import { al } from '../locales/al';
const Clients = () => {

    const [loading,setloading] = useState<boolean>(true)
    const [showModal,setShowModal] = useState<boolean>(false)
    const [patientId,setPatientId] = useState<number>(0)
    const [patientsList,setPatientsList] = useState<Patients[]>([])
    const apiUrl = useContext(ApiURL)
    
    const router = useRouter();
    const t = router.locale === 'en' ? en : al;

    const addOrUpdateUser = (id : number) => {
        setPatientId(id);
        setShowModal(true);
    }

    const deleteClient = async id => {
        const request = await axios.delete(`${apiUrl}/clients/DeleteClientById/${id}`,{
            withCredentials: true,
            headers: {
                Authorization : "Bearer " + localStorage.getItem("jwt")
            }
        });
        if(request.status ===200)
            localStorage.setItem("showSuccessToast","true")
        else
            localStorage.setItem("showSuccessToast","false")

        window.location.reload();
    }

    const fetchData = async () => {
        const request = await axios.get(`${apiUrl}/clients/GetClientsList?pageNumber=${1}`,{
            withCredentials: true,
            headers: {
                Authorization : "Bearer " + localStorage.getItem("jwt")
            }
        })
        if(request.status === 200) {
            const response = request.data
            setPatientsList(response);
            setloading(false)
        }
    }

    useEffect(() => {
        fetchData().then();
    },[])

    if(loading) {
        return (
            <NavBar>
                <Loader />
            </NavBar>
        )
    }

    return(
        <NavBar>
            <div id="toastNotification">
                {localStorage.getItem("showSuccessToast") === "true" && <SuccessToast  />}
                {localStorage.getItem("showSuccessToast") === "false" && <ErrorToast />}
            </div>
            <div className="container">
                 <div id="headerPart" className="d-flex justify-content-between">
                       <div>
                             <h2 className="mt-3">Patients list</h2>
                       </div>
                <div>
                    <button className="btn add-user-button mt-3 ml-4 background-slide" type="button" onClick={() => addOrUpdateUser(0)}>Add Patients</button>
                </div>
            </div>
            <div className="row mt-4">

                <div className="col mt-5">
                    <div className="table-responsive">
                        <table className="table table-borderless">
                            <thead>
                            <tr>
                                <th></th>
                                <th className="text-center">{t.Name}</th>
                                <th className="text-center">{t.LastName}</th>
                                <th className="text-center">{t.Gender}</th>
                                <th className="text-center">{t.DateOfBirth}</th>
                                <th className="text-center">{t.PersonalNumber}</th>
                                <th className="text-center">{t.Actions}</th>
                            </tr>
                            </thead>
                            <tbody>

                            {patientsList.map(item => {
                                return (
                                    <tr key={item.id} style= {{borderBottom: "1px solid lightgray"}}>
                                        <td>
                                            <img className="rounded-circle" src="assets/img/User.jpeg" width="30px" height="30px" />
                                        </td>
                                        <td className="text-center">
                                            {item.name}
                                        </td>
                                        <td className="text-center">
                                            {item.lastName}
                                        </td>
                                        <td className="text-center">
                                            {item.gender}
                                        </td>
                                        <td className="text-center">
                                            {item.dateOfBirth.toString().split("T")[0]}
                                        </td>
                                        <td className="text-center">
                                            {item.personalNumber}
                                        </td>
                                        <td className="justify-content-center d-flex flex-row">
                                            <button className="btn btn-light" type="button"
                                            onClick={() => {
                                                setPatientId(item.id)
                                                setShowModal(true)
                                            }}
                                            ><i className="fa fa-pencil"></i>
                                            </button>
                                            <button className="btn btn-light" type="button" onClick={async () => {
                                                await deleteClient(item.id)
                                            }}>
                                                <i className="fa fa-trash-o"></i>
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
            {showModal && <AddPatient onHide={async () => {
                setShowModal(false)
            }} id={patientId} />}
        </NavBar>
    )
}


export default Clients;
