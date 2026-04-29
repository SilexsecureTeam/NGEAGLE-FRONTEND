import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../src/Styles/Dialogue.css'

function DialogBox() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDialog = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mt-5">
      {isOpen && (
        <div className=" d-flex justify-content-center">
          <div className="dialog-box container m-auto mt-5  shadow-lg pt-3 ps-4 row align-items-center justify-content-between">
            <div className="col-md-6">
              <div>
                <div className="Trip-with-Ngeagle">
                  <p className="save-40 pt-2">
                    <b>
                      Save <span className="fourth-off">40% OFF</span> on{' '}
                    </b>
                  </p>
                  <p className="">
                    <b>your Trip With Ngeagle</b>
                  </p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet .vulputate
                  <br /> arcu sed aliquam quam gravida malesuada at.
                </p>
              </div>
              <div className="link-section d-flex align-items-center">
                <Link to="/About">
                  <p className="no-thanks pe-5">No Thanks</p>
                </Link>
                <Link className="fly-now px-4" to="/About">
                  <b>Fly Now </b>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <img
                className="img-fluid"
                src={require('../images/calling-imag.png')}
                alt="Plane"
              />
            </div>
            <div className="close-button" onClick={toggleDialog}>
              <img
                className="img-fluid relate-imag"
                src={require('../images/Mask.png')}
                alt="Plane"
              />
              <p className="close">Close</p>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center mt-4">
        <button onClick={toggleDialog} className="toggle-button button-to-toggle">
          {isOpen ? 'Close Dialogue' : 'Open Dialogue'}
        </button>
      </div>
    </div>
  )
}

export default DialogBox
