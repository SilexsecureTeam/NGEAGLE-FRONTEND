import React from 'react'
import FirstIcons from '../component/home/firstIcons'
import Middle from '../component/home/Middle'
import ThirdPart from '../component/home/thirdPart'
import Header from '../Layout/Header'

export default function Home() {
  return (
    <>
      <Header />
      <div className="overLay_below ">
        <img
          className="img-fluid"
          src={require('../images/planeimage.png')}
          alt="Main Plane"
        />
      </div>
      <div>
        <div style={{ paddingLeft: '75px', paddingRight: '75px' }}>
          <div className="container  m-auto  pb-3 pt-5">
            <h3>
              <b>Complete your travel experience</b>
            </h3>
          </div>

          <div className="mb-5 ">
            <FirstIcons />
          </div>
          <div>
            <Middle />
          </div>
        </div>

        <div>
          <ThirdPart />
        </div>
      </div>
    </>
  )
}
