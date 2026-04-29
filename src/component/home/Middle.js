import React, { useEffect } from 'react'
import MainCard from '../../Layout/components/MainCard'
import '../../style/Home/Middle.css'
import useRequest from '../../hooks/useRequest'
function Middle() {
  const { data, fetchData: getImage } = useRequest('special_feature', 'POST')

  useEffect(() => {
    getImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mt-3 d-flex justify-content-center container m-auto">
        <div className="middle-icon row justify-content-between contain  g-3 mb-4 ">
          {data.map((item, index) => {
            return (
              <div className="col-md-4">
                <MainCard item={item} key={index} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Middle
