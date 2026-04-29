import React, { useEffect } from 'react'
import '../style/modal.css'

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [isOpen])
  return isOpen ? (
    <div className="modal-overlay" onClick={onClose}> 
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  ) : null
}

export default Modal
