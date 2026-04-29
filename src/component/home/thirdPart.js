import React, { useEffect, useState } from 'react'
import '../../style/Home/thirdpart.css'
import useRequest from '../../hooks/useRequest'
import fetchImages from '../../hooks/useFetchImages'
import smileyWoman from '../../images/smiley-woman.png'
import { Link } from 'react-router-dom'

const ThirdPart = () => {
  const [dealType, setDealType] = useState(null)
  const { data: categories, loading, error, fetchData: fetchDealsCat } = useRequest('offercat', 'POST')
  const { data, fetchData: fetchDeals } = useRequest(`offercat/one/${dealType}`)

  useEffect(() => {
    fetchDealsCat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setDealType(categories[0]?.id)
  }, [categories])

  useEffect(() => {
    if (dealType !== null) {
      fetchDeals(`offercat/one/${dealType}`, 'GET')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealType])

  const handleChangeDeals = (id) => {
    setDealType(id)
  }

  return (
    <>
      {!loading && !error ? (
        <div className="justify-content-center">
          <div className="row justify-content-center g-0 pt-5">
            <div className="col-md-3">
              <div className="sign-relativ">
                <img className=" bg-grond " src={smileyWoman} alt="" />

                <div className="speci">
                  <p className="greater-than">{'>'}</p>
                  <p className="less-than">{'<'}</p>
                </div>
              </div>
            </div>
            <div className="px-5 third-main-part text-light col-md-3 font-weight-bold">
              <div className="my-relat">
                <div>
                  <p>
                    SERVICES THAT CAN
                    <br />
                    <b>TRANSFORM YOUR BUSINESS</b>
                  </p>
                </div>
                {categories?.map((category, index) => (
                  <div key={index} className={dealType === category?.id ? 'd-flex d catSelectoreee textWhiteReal' : 'd-flex d catSelectoreee'} onClick={() => handleChangeDeals(category?.id)}>
                    <b />
                    <span>0{index + 1}</span>
                    <p>{category?.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="luxry-main-part col-md-6"
              style={{ backgroundImage: `url(${fetchImages(data?.image)})` }}
            >
              <div className="p-5 mx-5">
                {/* <p>
                  <b>LUXURY TRAVEL EXPERIENCE</b>
                </p> */}
                <p>
                  {/* Learn how Ngeagle is continuing to evaluate, and make adjustments to
                  your travel experience while staying in close coordination with the CDC
                  and WHO to ensure your safety */}
                </p>
                <Link to={`/deals_offer/${data?.id}`}><p className="book-naow py-2 mt-5">Explore</p></Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ThirdPart
