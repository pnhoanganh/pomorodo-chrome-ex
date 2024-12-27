import React from 'react'

export default function Timer() {
  return (
    <>
      <h3 className="mt-4 fw-semibold">00:00</h3>
      <div className="btn-container d-flex justify-content-evenly">
        <button className="btn btn-success btn-sm lh-sm">Start</button>
        <button className="btn btn-danger btn-sm lh-sm">Pause</button>
        <button className="btn btn-primary btn-sm lh-sm">Reset</button>
      </div>
    </>
  )
}
