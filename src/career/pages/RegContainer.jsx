/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import NavBar from '../components/NavBar'
import Register from './Register'

function RegContainer() {
  return (
    <div>
      <div className="header-career-ii">
        <NavBar />
      </div>

      <div style={{ boxShadow: '10px' }}>
        <Register />
      </div>
    </div>
  )
}

export default RegContainer
