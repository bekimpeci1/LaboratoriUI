import React, {useContext, useEffect, useRef, useState} from 'react'
import Props from "../Interfaces/ModalGeneralProps"
import stock from "../Classes/Stock";
import axios from "axios";
import {ApiURL} from "../Context/ApiURL";
import Stock from "../Classes/Stock";
import { useRouter } from 'next/router';
import { en } from '../locales/en';
import { al } from '../locales/al';
const AddOrUpdateStock : React.FC<Props> = ({onHide,id})  => {

    const stockName = useRef<HTMLInputElement>(null)
    const stockUnits = useRef<HTMLInputElement>(null)
    const apiUrl = useContext(ApiURL);

    const router = useRouter();
    const t = router.locale === 'en' ? en : al;


    const addOrUpdateStock = async () => {
        const newStock = new Stock()
        newStock.units = parseInt(stockUnits.current.value);
        newStock.name = stockName.current.value;
        newStock.id = id;
        const request = await axios.post(`${apiUrl}/stocks/${id === 0 ? "AddStocks" : "UpdateStock"}`,newStock,{
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
                "Content-type" :"application/json",
                Accept: "application/json"
            }
        })
        if(request.status ==200)
            localStorage.setItem("showSuccessToast","true")
        else
            localStorage.setItem("showSuccessToast","false")
        window.location.reload()
    }

    const fetchData = async(id) => {
        const request = await axios.get(`${apiUrl}/stocks/GetStockById/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
                "Content-type" :"application/json",
                Accept: "application/json"
            }
        })
        if(request.status === 200) {
            const response = await request.data;
            stockName.current.value = response.name;
            stockUnits.current.value = response.units;
        }

    }

    useEffect(() => {
        fetchData(id).then();
    })

    window.addEventListener("keyup", e => {
        if(e.key == "Escape") onHide();
    })


    return (
        <div className='partialModal-sm'>
            <div className="d-flex justify-content-between">
                <h3 className="m-3 p-2" >{id === 0? "Add" : "Update"} Stock</h3>
                <p className="m-3 p-2" style={{
                    cursor: 'pointer'
                }}
                onClick={() => onHide()}
                >x</p>
            </div>

            <div className="row" style={{
                width: '90%',
                marginLeft: '1rem',
                marginTop: '1.3rem'
            }}>
                <div className=" col-12">
                    <label >{t.Name}</label>
                    <input type="text" name="" id="" ref={stockName} className="form-control"/>
                </div>
                <div className="col-12 mt-2">
                    <label htmlFor="">{t.Units}</label>
                    <input type="number" name="" ref={stockUnits} className="form-control"/>
                </div>
                <div className="row justify-content-center mt-4">
                    <button style ={{
                        width: '200px'
                    }} className="btn btn-dark"
                    onClick={addOrUpdateStock}
                    >
                        {t.Save}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default  AddOrUpdateStock
