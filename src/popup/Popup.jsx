import { useState, useEffect } from 'react'
import logo from '../../public/img/pomorodo.png'

import './Popup.css'

export const Popup = () => {
  return (
    <main>
      <h1 className="fs-1 mt-2 fw-medium title mb-4">Pomorodo timer</h1>
      <div>
        <img src={logo}></img>
      </div>
      <h1 className="fs-1 mt-4 fw-semibold">00:00</h1>
      <div className="btn-container d-flex justify-content-evenly">
        <button className="btn btn-success btn-sm lh-sm">Start time</button>
        <button className="btn btn-danger btn-sm lh-sm">Reset time</button>
        <button className="btn btn-primary btn-sm lh-sm">Add task</button>
      </div>
      <div className="input-group input-group-lg mt-4">
        <input type="text" className="form-control" placeholder="Add your task..." />
        <i className="bi bi-trash3-fill input-group-text"></i>
      </div>
    </main>
  )
}

export default Popup
