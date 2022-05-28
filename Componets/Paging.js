import React from 'react'

const Paging = props => {
    return(
        <>
       <ul id="paging">
           <li><a href="#" className="prev page">&lt;Prev</a></li>
           <li className="pageNumber" id="active"><a  className="">1</a></li>
           <li className="pageNumber"><a className="page">2</a></li>
           <li className="pageNumber"><a className="page">3</a></li>
           <li className="pageNumber"><a className="page">4</a></li>
           <li className="pageNumber"><a className="page">5</a></li>
           <li className="pageNumber"><a className="page">6</a></li>
           <li><a href="#" className="next page">Next{">"}</a></li>
       </ul>
        </>
       
    )
}


export default Paging