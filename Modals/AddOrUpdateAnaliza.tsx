import React, {useContext, useEffect, useRef, useState} from 'react'
import Props from "../Interfaces/ModalGeneralProps"
import stock from "../Classes/Stock";
import axios from "axios";
import {ApiURL} from "../Context/ApiURL";
import Stock from "../Classes/Stock";
import { useRouter } from 'next/router';
import { en } from '../locales/en';
import { al } from '../locales/al';
import AnalizaStockModel from "../Classes/AnalizaStockClass";
import {forEach} from "react-bootstrap/ElementChildren";

const AddOrUpdateAnaliza : React.FC<Props> = ({onHide,id})  => {

    const analizaName = useRef<HTMLInputElement>(null)
    const analizaunits = useRef<HTMLInputElement>(null)
    const analizaReferenceUnit = useRef<HTMLInputElement>(null)
    const analizaPrice = useRef<HTMLInputElement>(null)
    const stockName = useRef<HTMLInputElement>(null);
    const stockUnits = useRef<HTMLInputElement>(null);
    const stockPartDiv = useRef<HTMLDivElement>(null)
    const [analizaStock, setAnalizaStock] = useState<AnalizaStockModel[]>([]);
    const router = useRouter();
    const t = router.locale === 'en' ? en : al;
    const apiUrl = useContext(ApiURL);

    const addOrUpdateAnaliza = async () => {
        const analiza = {
            id : 0,
            name: '',
            unit: 0,
            referenceUnit : '',
            stocks: [],
            price: 0
        }

        analiza.name = analizaName.current.value;
        analiza.unit = parseInt(analizaunits.current.value);
        analiza.referenceUnit = analizaReferenceUnit.current.value;
        analiza.price = parseInt(analizaPrice.current.value);
        analiza.id = id;
        document.querySelectorAll("[name='stockName']").forEach((element : HTMLInputElement) => {
            if(!element.value) return;
            const stockModel = new AnalizaStockModel();
            stockModel.stockName = element.value;
            const stockUnits : HTMLInputElement = element.parentElement.nextElementSibling.firstElementChild as HTMLInputElement;
            stockModel.stockUnits = parseInt(stockUnits.value);
            analiza.stocks.push(stockModel);
        })
        console.log(analiza)
        debugger;
        const request = await axios.post(`${apiUrl}/analizat/${id === 0 ? "AddAnaliza" : "UpdateAnaliza"}`,analiza,{
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


    const addStock = () => {
        const stockModel = new AnalizaStockModel();
        if(!stockName.current.value || !stockUnits.current.value) return;
        stockModel.stockName = stockName.current.value;
        stockModel.stockUnits = parseInt(stockUnits.current.value);
        stockName.current.value = '';
        stockUnits.current.value = '';
        setAnalizaStock([...analizaStock,stockModel])
    }

    const fetchData = async () => {
       const request =  await axios.get(`${apiUrl}/analizat/GetAnalizaById?id=${id}`, {
            withCredentials: true,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
                "Content-type" :"application/json",
                Accept: "application/json"
            }
        })
        if(request.status === 200) {
            const response = await request.data;
            console.log(response)
            if(response.length == 0) return;
            analizaName.current.value = response[0].analizeName;
            analizaReferenceUnit.current.value = response[0].referenceValue;
            analizaunits.current.value = response[0].analizaUnit;
            analizaPrice.current.value = response[0].price;
            const analizaStockArray = [];
            response.forEach(element => {
                analizaStockArray.push(element);
            })
            setAnalizaStock(analizaStockArray);
        }
    }

    window.addEventListener("keyup", e => {
        if(e.key == "Escape") onHide();
    })

    useEffect(() => {
        fetchData().then();
    },[])

    const updateFieldChanged = index => e => {
        console.log('index: ' + index);
        console.log('property name: '+ e.target.name);
        let newArr = [...analizaStock]; // copying the old datas array
        newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to

        setAnalizaStock(newArr);
    }

    return(
        <div className='partialModal-lg'>
            <div className="d-flex justify-content-between">
                <h3 className="m-3 p-2" >{id === 0? "Add" : "Update"} Analiza</h3>
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
                    <input type="text" name="" id="" ref={analizaName} className="form-control"/>
                </div>
                <div className="col-12 mt-2">
                    <label htmlFor="">{t.Units}</label>
                    <input type="number" name="" ref={analizaunits} className="form-control"/>
                </div>
                <div className="col-12 mt-2">
                    <label htmlFor="">{t.ReferenceUnit}</label>
                    <input type="text" ref={analizaReferenceUnit} className="form-control"/>
                </div>
                <div className="col-12 mt-2">
                    <label htmlFor="">{t.Price}</label>
                    <input type="number" name="" ref={analizaPrice} className="form-control"/>
                </div>
                <div ref={stockPartDiv}>
                    {analizaStock.map((item, index) => {
                        return(
                            <div key={item.stockId} className={'row'}>
                                <div className="col-6">
                                    Stock name
                                </div>
                                <div className="col-6">
                                    Stock units
                                </div>
                                <div className="col-6">
                                    <input type="text" name='stockName' value={item.stockName} onChange={updateFieldChanged}   className="form-control"/>
                                </div>
                                <div className="col-6">
                                    <input type="text" name='stockValue' value={item.stockUnits} onChange={updateFieldChanged}   className="form-control"/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div  className={'row'}>

                        <div className="col-6">
                            Stock name
                        </div>
                        <div className="col-6">
                            Stock units
                        </div>
                    <div className="col-6">
                        <input type="text" ref={stockName} name='stockName' className="form-control"/>
                    </div>
                    <div className="col-5">
                        <input type="text" ref={stockUnits} name='stockUnits' className="form-control"/>
                    </div>
                    <div className="col-1" style={{cursor: 'pointer'}} onClick={addStock}>
                        +
                    </div>
                </div>


                <div className="row justify-content-center mt-4">
                    <button style ={{
                        width: '200px'
                    }} className="btn btn-dark"
                            onClick={addOrUpdateAnaliza}
                    >
                        {t.Save}
                    </button>
                </div>
            </div>
        </div>

    )
}

export  default AddOrUpdateAnaliza