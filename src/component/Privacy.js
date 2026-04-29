import React from 'react'
import '../../src/style/Privacy.css'
import useRequest from '../hooks/useRequest'
import { useEffect } from 'react'
import ThirdPart from './home/thirdPart'

function Privacy() {
  const { data, error, fetchData, loading } = useRequest('policy', 'POST')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="">
      <div className="privacy-main text-light container-fluid">
        <div className=" md-policy container m-auto text-center align-items-center">
          <div className="d-flex justify-content-center emp">
            <p className="empt"></p>
          </div>
          <p className="privacy">
            <b>PRIVACY</b>
          </p>
          <p className="small-policy">
            <b>POLICY</b>
          </p>
        </div>
      </div> 
      <div className="">
        <img
          className="bometric img-fluid"
          src={require('../../src/images/bottomrec.png')}
          alt=""
        />
      </div>

      <div className="">
        {!loading && !error ? (
          <div className="container m-auto p-5">
            {data?.map((policy, index) => (
              <div key={index}>
                <div className="">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: policy?.description,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="">
        <ThirdPart />
      </div>
    </div>
  )
}

export default Privacy

// <div className="">
//       {!loading && !error ? (
//         <div className="container m-auto p-5">
//           {data?.map((privacy, index) => (
//             <div  key={index}>

//             </div>
//           ))}

//         </div>
//       ) : null}
//     </div>
