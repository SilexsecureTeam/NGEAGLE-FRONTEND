import React from 'react'

import Middle from '../component/home/Middle'
import { COLORS } from '../utilities/constants'
import '../style/About.css'
import AboutHeader from '../component/About/AboutHeader'
import FactsNFigures from '../component/About/FactsNFigures'

function About() {
  return (
    <div>
      <div style={{ backgroundColor: COLORS.secondary, color: 'white' }}></div>
      <AboutHeader />

      <div className="about-business d-flex justify-content-between py-5 px-5 m-auto">
        <div className="row justify-content-between py-2 container m-auto">
          <div className="col-md-2">
            <div className="" style={{ fontSize: '18px' }}>
              <p className="welcom-part pb-5 text-black">
                <b>WELCOME</b>
              </p>
              <div className="about-and-career">
                <p className="about">
                  <b>About</b>
                </p>
                <p className="careers">
                  <b>Careers</b>
                </p>
                <p className="Newss">
                  <b>News</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-10 text-start">
            <div className="mt-5">
              <h2>
                <b>A BRAND ECOSYSTEM AGENCY.</b>
                <br />
                <span>
                  We craft beautifully useful marketing and digital products that grows
                  businesses
                </span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor i ncididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostru
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          top: -5,
          zIndex: -1,
        }}
      >
        <img
          className="img-fluid border-imag"
          src={require('../images/bottomrec.png')}
          alt=""
        />
      </div>

      <FactsNFigures />
      <div className="mt">
        <Middle />
      </div>
    </div>
  )
}

export default About
