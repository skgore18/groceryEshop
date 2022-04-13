import { Send } from '@material-ui/icons'
import React from 'react'
import "./Newsletter.css"



const Newsletter = () => {
  return (
    <div className="newsContainer">
        <h1 className="newsTitle">Newsletter</h1>
        <div className="newsDescription">Get timely updates from your favourite products.</div>
        <div className="newsInputContainer">
            <input className="newsInput" placeholder="Your Email"/>
            <button className="newsButton">
                <Send/>
            </button>
        </div>
    </div>
  )
}

export default Newsletter