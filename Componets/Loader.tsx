import React, {FC} from 'react'

const Loader :FC = () => {

    const centerLoading : object = {
        position: 'absolute',
        top:'50%',
        right: '50%',
        
    }

    return(
        <div style={centerLoading} className="spinner-border" role="status">
  <span className="sr-only"></span>
    </div>
    )
}


export default Loader