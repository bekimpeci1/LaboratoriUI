import React, {useContext, useEffect, useState} from 'react'
import NavBar from "../Componets/Navbar";
import axios from "axios";
import {ApiURL} from "../Context/ApiURL";
import Stock from "../Classes/Stock";
import Loader from "../Componets/Loader";
import SuccessToast from "../Componets/SuccessToast";
import ErrorToast from "../Componets/FailedToast";
import AddStockModal from '../Modals/AddOrUpdateStock';
import { useRouter } from 'next/router';
import { en } from '../locales/en';
import { al } from '../locales/al';
const Stocks = () => {
    const [showModal,setShowModal] = useState<boolean>(false)
    const [loading, setloading] = useState<boolean>(true)
    const apiUrl = useContext(ApiURL);
    const [stockList,setStockList] = useState<Stock[]>([])
    const [stockId,setStockId] = useState<number>(0)

    const router = useRouter();
    const t = router.locale === 'en' ? en : al;

    const showModalOnClick = id => {
        setStockId(id)
        setShowModal(true)
    }


    const deleteStock = async (id : number) => {
        const request = await axios.delete(`${apiUrl}/stocks/DeleteStockById/${id}`, {
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

    const fetchData = async () => {
        const request = await axios.get(`${apiUrl}/stocks/GetStocksList?pageNumber=1`, {
            withCredentials:true,
            headers: {
                Authorization : "Bearer " + localStorage.getItem("jwt")
            }
        });
        if(request.status === 200) {
            const responseJson =  request.data;
            setStockList(responseJson);
            setloading(false)
        }
    }

    useEffect(() : void => {
        fetchData().then();

    },[])


        if(loading) {
            return (
                 <NavBar>
                      <Loader />
                 </NavBar>
            )
        } else {
            return(
                 <NavBar>
                     <div id="toastNotification">
                         {localStorage.getItem("showSuccessToast") === "true" && <SuccessToast  />}
                         {localStorage.getItem("showSuccessToast") === "false" && <ErrorToast />}
                     </div>
                    <div className="container">
                        <div id="headerPart" className="d-flex justify-content-between">
                            <div>
                                <h2 className="mt-3">{t.StocksList}</h2>
                            </div>
                            <div>
                                <button className="btn add-user-button mt-3 ml-4 background-slide"  onClick={() => showModalOnClick(0)} type="button">Add Stock</button>
                            </div>
                        </div>
                    <div className="row mt-4">

                        <div className="col">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th className="text-center">{t.Name}</th>
                                        <th className="text-center">{t.Units}</th>
                                        <th className="text-center">{t.Actions}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        stockList.map(item => {
                                            return (
                                                <tr key={item.id} style= {{borderBottom: "1px solid lightgray"}}>
                                                    <td>
                                                        <img className="rounded-circle" src="assets/img/User.jpeg" width="30px" height="30px" />
                                                    </td>
                                                    <td className="text-center">
                                                        {item.name}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.units}
                                                    </td>
                                                    <td className="justify-content-center d-flex flex-row">
                                                        <button className="btn btn-light" type="button"
                                                                onClick={() => {
                                                                    showModalOnClick(item.id)
                                                                }}
                                                        ><i className="fa fa-pencil"></i>
                                                        </button>
                                                        <button className="btn btn-light" onClick={async () => {
                                                             await deleteStock(item.id)
                                                        }} type="button"><i className="fa fa-trash-o"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                     {showModal && <AddStockModal id={stockId} onHide={async () => {
                         setShowModal(false)} } />}
            </NavBar>
            )
        }
}


export default Stocks
