import React, {useEffect} from 'react'


const SuccessToast = () => {

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('toastsss')?.classList.add('fadingToast');
        },1000)
        setTimeout(() => {
            document.getElementById('toastsss')?.classList.add('d-none');
        },2000);
        localStorage.removeItem("showSuccessToast")
    },[])

    const closeNotification = e => {
        e.preventDefault()
        document.getElementById('toastsss').classList.add('d-none');
    }

    return(
        <div className="m-5 d-flex globalToast" id="toastsss"
             style={{height:"5rem",width:"25rem",backgroundColor:"white",borderRadius:"15px",boxShadow:"2px 4px 15px -4px rgba(0,0,0,0.64)"}}>
            <div style={{height:"75%",width:"1.9%",marginTop:"0.7rem",marginLeft:"0.3rem",border:"1px solid black",background:"#08a54f",borderRadius:"20px"}}>

            </div>
            <div className="d-flex"
                 style={{height:"90%",width:"92%",marginTop:"5px",marginLeft:"10px"}}>
                <div style={{flex:'1'}}><img className="mt-2" src="assets/img/icons8-ok.svg"/></div>
                <div style={{flex:'5'}}>
                    <p className="ml-1 toast-title">Success!</p>
                    <p className="toast-text-message">Data was saved successfully!</p>
                </div>
                <div style={{flex:"1",display:"grid",placeItems:"center"}}>
                    <button className="btn" type="button" onClick={closeNotification} style= {{color:'#3b3d39'}}>X</button>
                </div>
            </div>
        </div>

    )
}


export  default SuccessToast