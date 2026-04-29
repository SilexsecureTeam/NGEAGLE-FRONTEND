import React from 'react'

export default function TravelExperience({ item }) {
    return (
        <div className="first-icon text-center col-md-2">
            <p className='ng-eagle-on-icon'>{item.title}</p>
            <img className='first-icon-image ' src={item.image} alt="" />
            <div className="text"><p>{item.sub_title}</p></div>
        </div>
    )
}
