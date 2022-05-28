import {useContext} from "react";

const globalConfiguration = new useContext({
    withCredentials: true,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-type" :"application/json",
        Accept: "application/json"
    }
})