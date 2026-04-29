import Plane from './Plane'
import Middle from '../home/Middle'
import ThirdPart from '../home/thirdPart'
import FortPart from '../home/FortPart'
import Header from '../../Layout/Header'

export default function Home() {
  return (
    <>
      <div>

        <Header />
      </div>
      <div>
        <Plane />
      </div>




      <div >

        <div style={{ paddingLeft: '0px', paddingRight: '0px' }}>

          <div className='container m-auto  pb-3 pt-5'>
            <h3>
              <b>Complete your travel experience</b>
            </h3>
          </div>

          <div className='mb-5'>
            <FirstIcons />
          </div>
          <div>
            <Middle />
          </div>
        </div>

        <div>
          <ThirdPart />
        </div>
        <h1 className='text-center mt-5'>
          <b>Popular Destinations</b>
        </h1>
        <FortPart />
      </div>
    </>

  )
}


