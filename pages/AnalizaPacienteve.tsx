// import NavBar from "../Componets/Navbar";
// import React, {useContext, useEffect, useState} from "react";
// import AnalizaModel from "../Classes/Analiza";
// import {ApiURL} from "../Context/ApiURL";
// import {useRouter} from "next/router";
// import {en} from "../locales/en";
// import {al} from "../locales/al";
// import axios from "axios";
// import Loader from "../Componets/Loader";
// import SuccessToast from "../Componets/SuccessToast";
// import ErrorToast from "../Componets/FailedToast";
// import AddOrUpdateAnaliza from "../Modals/AddOrUpdateAnaliza";
//
//
// const Analiza = () => {
//     const [loading,setloading] = useState<boolean>(true)
//     const [showModal,setShowModal] = useState<boolean>(false)
//     const [analizaPacientitId,setAnalizaPacientitId] = useState<number>(0)
//     const [analizaPacineteveList,setAnalizaPacienteveList] = useState<AnalizaModel[]>([])
//     const apiUrl = useContext(ApiURL)
//
//     const router = useRouter();
//     const t = router.locale === 'en' ? en : al;
//
//     const deleteAnaliza = async id => {
//         const request = await axios.delete(`${apiUrl}/analizat/DeleteAnaliza/${id}`,{
//             withCredentials: true,
//             headers: {
//                 Authorization : "Bearer " + localStorage.getItem("jwt")
//             }
//         });
//         if(request.status ===200)
//             localStorage.setItem("showSuccessToast","true")
//         else
//             localStorage.setItem("showSuccessToast","false")
//
//         window.location.reload();
//     }
//
//
//     const fetchData = async () => {
//         const request = await axios.get(`${apiUrl}/analizat/GetAnalizaList?pageNumber=${1}`,{
//             withCredentials: true,
//             headers: {
//                 Authorization : "Bearer " + localStorage.getItem("jwt")
//             }
//         })
//         if(request.status === 200) {
//             const response = request.data
//             console.log(response);
//             setAnalizaList(response);
//             setloading(false)
//         }
//     }
//
//     const addOrUpdateAnaliza = (id : number) => {
//         setAnalizaId(id);
//         setShowModal(true);
//     }
//
//     useEffect(() => {
//         fetchData().then();
//     },[])
//
//     if(loading) {
//         return (
//             <NavBar>
//                 <Loader />
//             </NavBar>
//         )
//     }
//
//
//     return(
//         <NavBar>
//             <div id="toastNotification">
//                 {localStorage.getItem("showSuccessToast") === "true" && <SuccessToast  />}
//                 {localStorage.getItem("showSuccessToast") === "false" && <ErrorToast />}
//             </div>
//             <div className="container">
//                 <div id="headerPart" className="d-flex justify-content-between">
//                     <div>
//                         <h2 className="mt-3">Analiza list</h2>
//                     </div>
//                     <div>
//                         <button className="btn add-user-button mt-3 ml-4 background-slide" type="button" onClick={() => addOrUpdateAnaliza(0)}>Add Analiza</button>
//                     </div>
//                 </div>
//                 <div className="row mt-4">
//
//                     <div className="col mt-5">
//                         <div className="table-responsive">
//                             <table className="table table-borderless">
//                                 <thead>
//                                 <tr>
//                                     <th></th>
//                                     <th className="text-center">{t.Name}</th>
//                                     <th className="text-center">{t.Units}</th>
//                                     <th className="text-center">{t.ReferenceUnit}</th>
//                                     <th className="text-center">{t.Actions}</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//
//                                 {analizaList.map(item => {
//                                     return (
//                                         <tr key={item.id} style= {{borderBottom: "1px solid lightgray"}}>
//                                             <td>
//                                                 <img className="rounded-circle" src="assets/img/User.jpeg" width="30px" height="30px" />
//                                             </td>
//                                             <td className="text-center">
//                                                 {item.name}
//                                             </td>
//                                             <td className="text-center">
//                                                 {item.units}
//                                             </td>
//                                             <td className="text-center">
//                                                 {item.referentUnit}
//                                             </td>
//                                             <td className="justify-content-center d-flex flex-row">
//                                                 <button className="btn btn-light" type="button"
//                                                         onClick={() => {
//                                                             setAnalizaId(item.id)
//                                                             setShowModal(true)
//                                                         }}
//                                                 ><i className="fa fa-pencil"></i>
//                                                 </button>
//                                                 <button className="btn btn-light" type="button" onClick={async () => {
//                                                     await deleteAnaliza(item.id)
//                                                 }}>
//                                                     <i className="fa fa-trash-o"></i>
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     )
//                                 })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//
//
//             </div>
//             {showModal && <AddOrUpdateAnaliza onHide={async () => {
//                 setShowModal(false)
//             }} id={analizaId} />}
//         </NavBar>
//     )
// }