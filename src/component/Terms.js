import React, { useEffect } from 'react'
import '../../src/style/TermsCond.css'
import ThirdPart from './home/thirdPart'
import useRequest from '../hooks/useRequest'
// import ThirdPart from './homePage/thirdPart';
function Terms() {
  const { data, fetchData, loading, error } = useRequest('terms', 'POST')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!loading && !error ? (
        <div>
          <div className="main-part-terms-condition text-light text-center">
            <div className="main-part-terms-cond ">
              <p className="terms">
                <b>TERMS</b>
              </p>
              <p className="condition">
                <b>AND CONDITION</b>
              </p>
            </div>
          </div>

          <div className="pb-5">
            <img
              className="botto img-fluid"
              src={require('../../src/images/bottomrec 1.png')}
              alt=""
            />
          </div>
          <div className="container m-auto p-5">
            <div className="a-brand-ecosystem">
              <b dangerouslySetInnerHTML={{ __html: data[0]?.description }} />
            </div>

            <h6
              className="a-brand-description"
              dangerouslySetInnerHTML={{ __html: data[0]?.content }}
            />
          </div>

          <div className="">
            <ThirdPart />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Terms
