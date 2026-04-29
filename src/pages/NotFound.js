import React from 'react'
import '../style/NotFound.css'

const NotFound = () => {
  return (
    <>
      <div className="error-container">
        <div className="error-content">
          <h1 className="error-title">404 - Page Not Found</h1>
          <p className="error-description">
            Sorry, the page you are looking for doesn't exist.
          </p>
          <a href="/" className="error-link">
            Back to Home
          </a>
        </div>
      </div>
    </>
  )
}

export default NotFound
