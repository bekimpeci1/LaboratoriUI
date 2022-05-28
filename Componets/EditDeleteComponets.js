import React, {useContext} from 'react'
import axios from "axios";
import {JwtToken} from "../Context/JWTTokenContext";

const EditDeleteView = props => {


    const {jwtToken} = useContext(JwtToken);
     const deleteUser = async e => {
        e.preventDefault();
        const  request = await fetch(`https://localhost:5001/api/user/DeleteUserById/${props.itemID}`,{
            method :"DELETE",
            credentials: "include",
            headers:{"Content-Type": "application/json"}
        });
        const response = await request.json();
        console.log(response);
    }

    const editUser = async () => {
        const request = await axios.get(props.editUrl,{
            headers : {
                Authorization : "Bearer " + jwtToken,
                "Content-type": "application/json",
                Accept: "application/json"
            },
            withCredentials: true
        })

        console.log(request.data)
    }
  
    return(
    <>
        <button className="btn btn-light" type="button" onClick={editUser}><i className="fa fa-pencil"></i>
        </button>
        <button className="btn btn-light" type="button"><i className="fa fa-trash-o"></i>
        </button>
    </>
    )
}


export default EditDeleteView