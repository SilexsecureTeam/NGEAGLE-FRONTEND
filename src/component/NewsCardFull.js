import React from 'react'
import { Link } from 'react-router-dom'
import fetchImages from '../hooks/useFetchImages'
import { COLORS } from '../utilities/constants'

const NewsCardFull = ({ news }) => {
  const getDateTime = (date) => {
    const changeDate = new Date(date)
    const finalDate = changeDate.toLocaleDateString(undefined, {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    const finalTime = changeDate.toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })

    return `${finalDate} ${finalTime}`
  }

  return (
    
    <div className="mb-3 col-md-4" style={{ width: '100%' }}>
      <div>
        <img
          // src={fetchImages('Event', news?.image)}
          src={fetchImages(news?.image)}
          alt=""
          className="img-fluid w-100"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      </div>
      <div className="p-3 text-white" style={{ backgroundColor: COLORS.secondary }}>
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold">
            {' '}
            <Link to={`/news_details/${news?.id}`} className="nav-link">
              {news?.title}
            </Link>
          </h5>
          <span className=" fs_xsm" style={{ color: COLORS.secondary }}>
            {news.type}
          </span>
        </div>
        <div className="prime_border col-6"></div>
        <div className="my-3">
          <p>{getDateTime(news?.updated_at)}</p>
        </div>
      </div>
    </div>
  )
}

export default NewsCardFull
