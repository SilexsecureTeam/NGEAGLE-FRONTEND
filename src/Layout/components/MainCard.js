import { ArrowForwardIos } from '@mui/icons-material'
import React from 'react'
import fetchImages from '../../hooks/useFetchImages'

export default function MainCard({ item }) {
  return (
    <div>
      <div className="main-middle">
        <img
          className="img-fluid"
          src={fetchImages(item?.image)}
          alt=""
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        />
      </div>

      <div className="muni p-4 ">
        <p className="underline-para text-light ">
          <b>{item.title}</b>
        </p>
        <p className="pt-4"> {item.description}</p>
        <div className="greater-than-sign">
          <ArrowForwardIos />
        </div>
      </div>
    </div>
  )
}
