import React from 'react'

interface ButtonNextBack{
    changeNext:any;
    changeBack:any;
    urlState: any;
}

function Botones( {changeNext, changeBack, urlState}: ButtonNextBack) {
  return (
    <div>
        <div className="button-borders">
          {urlState[1] && <button onClick={changeBack} className="primary-button">BACK!</button>}
          {urlState[0] && <button onClick={changeNext} className="primary-button">NEXT!</button>}
        </div>
    </div>
  )
}

export default Botones