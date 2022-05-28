import React, {useContext, useEffect, useRef} from 'react';
import Props from "../Interfaces/ModalGeneralProps";
import Patient from "../Classes/Patients";
import axios from "axios";
import {ApiURL} from "../Context/ApiURL";
import { useRouter } from 'next/router';
import { en } from '../locales/en';
import { al } from '../locales/al';
const  AddPatient : React.FC<Props>  = ({id,onHide}) =>  {
    const name = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const dateOfBirth = useRef<HTMLInputElement>(null);
    const gender = useRef<HTMLSelectElement>(null);
    const personalNumber = useRef<HTMLInputElement>(null);
    const phoneNumber = useRef<HTMLInputElement>(null)
    const apiUrl = useContext(ApiURL)

    const router = useRouter();
    const t = router.locale === 'en' ? en : al;

    const addOrUpdateClient = async () => {
        const patient = new Patient();
        patient.name = name.current.value;
        patient.lastName = lastName.current.value;
        patient.dateOfBirth = new Date(dateOfBirth.current.value);
        patient.gender = gender.current.value;
        patient.personalNumber = personalNumber.current.value;
        patient.phonenumber = phoneNumber.current.value;
        patient.id = id;
        const request = await axios.post(`${apiUrl}/clients/${id === 0 ? "AddClients" : "UpdateClient"}`,patient,{
            withCredentials: true,
            headers: {
                Authorization : "Bearer " + localStorage.getItem("jwt")
            }
        })
        if(request.status ===200)
            localStorage.setItem("showSuccessToast","true")
        else
            localStorage.setItem("showSuccessToast","false")

        window.location.reload();

    }

    const fetchData = async () => {
      const request = await axios.get(`${apiUrl}/clients/GetClientById/${id}`,{
          withCredentials: true,
          headers: {
              Authorization : "Bearer " + localStorage.getItem("jwt")
          }
      })
        if(request.status === 200) {
            const response = request.data;
            name.current.value = response.name;
            lastName.current.value = response.lastName;
            dateOfBirth.current.value = response.dateOfBirth?.toString().split("T")[0];
            personalNumber.current.value = response.personalNumber;
            phoneNumber.current.value = response.phoneNumber;
            gender.current.value = response.gender;
        }
    }

    useEffect(() => {
        fetchData().then()
    },[])

    window.addEventListener("keyup", e => {
        if(e.key == "Escape") onHide();
    })

    return (
        <div>
            <div className="row partialModal-md">
                <div className="d-flex justify-content-between">
                    <h3 className="m-3 p-2" >{id === 0? "Add" : "Update"} {t.Patient}</h3>
                    <p className="m-3 p-2" style={{
                        cursor: 'pointer'
                    }}
                       onClick={() => onHide()}
                    >x</p>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">{t.Name}</label>
                    <input type="text" name="" ref={name} id="" className="form-control"/>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">{t.LastName}</label>
                    <input type="text" name="" ref={lastName} id="" className="form-control"/>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">{t.Gender}</label>
                    <select name="" id="" ref={gender} className="form-control">
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>

                <div className="form-group col-6">
                    <label htmlFor="">{t.DateOfBirth}</label>
                    <input type="date"  ref={dateOfBirth} name="" id="something" className="form-control"/>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">{t.PersonalNumber}</label>
                    <input type="text" ref={personalNumber} name="" id="" className="form-control"/>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="">{t.PhoneNumber}</label>
                    <input type="tel" ref={phoneNumber} name="" id="" className="form-control"/>
                </div>
                <div className="row justify-content-center">
                    <button className="btn btn-dark " style={{
                        width:'100px',
                        height: '60px',
                        fontWeight: 'bolder'
                    }} onClick={addOrUpdateClient}>{t.Save}</button>
                </div>
            </div>
            </div>
    );
}

export default AddPatient;
