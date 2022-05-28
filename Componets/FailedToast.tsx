import React, {useEffect} from 'react'

const ErrorToast = () => {

    useEffect(() => {

        setTimeout(() => {
            document.getElementById('xxx')?.classList.add('fadingToast');
        },1000)
        setTimeout(() => {
            document.getElementById('xxx')?.classList.add('d-none');
        },2000);
        localStorage.removeItem("showSuccessToast")

    },[])

    const closeNotification = e => {
        e.preventDefault()
        document.getElementById('xxx').classList.add('d-none');
    }

    return (
        <div className="m-5 d-flex globalToast" id="xxx"
             style={{height: '5rem',width: '25rem',backgroundColor: 'white',borderRadius: '15px',boxShadow: '2px 4px 15px -4px rgba(0,0,0,0.64)'}}>
            <div style={{height: '75%',width: '1.9%',marginTop: '0.7rem',marginLeft: '0.3rem',border: '1px solid black',background: '#f2981e',borderRadius: '20px'}}>

            </div>
            <div className="d-flex"
                 style={{height: '90%',width: '92%',marginTop: '5px',marginLeft: '10px'}}>
                <div style={{flex: '1'}} >
                    <img className="mt-2" alt={'Error image'} src="assets/img/errorIcon.svg" style={{width:'2.7rem'}}/></div>
                <div style={{flex:'5'}}>
                    <p className="ml-1 toast-title">Oh Ohh!</p>
                    <p className="toast-text-message">Something went wrong!</p>
                </div>
                <div style={{flex: '1',display: 'grid',placeItems: 'center'}}>
                    <button className="btn" onClick={closeNotification} type="button" style={{color:'#3b3d39'}}>X</button>
                </div>
            </div>
        </div>
    )
}


export default ErrorToast