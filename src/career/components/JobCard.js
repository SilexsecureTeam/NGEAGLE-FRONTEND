import React from 'react'
import { Link } from 'react-router-dom'

export default function JobCard({ item, type, savejob }) {
  return (
    <>
      <div>
        <div
          style={{ border: '1px solid #17298F', borderRadius: '10px' }}
          className="my-2 p-4 "
        >
          <div className="job-title d-flex justify-content-between">
            <p>
              {' '}
              {item.job_title}
              {item.opening_type === 'internal' && (
                <span className="skill" style={{ fontSize: 10 }}>
                  {item.opening_type}
                </span>
              )}
            </p>
            {type === 'applications' && (
              <p
                className={
                  item.status === 'pending'
                    ? 'btn btn-primary text-white '
                    : item.status === 'accepted'
                    ? 'btn text-white btn-success'
                    : item.staus === 'rejected'
                    ? 'btn text-white btn-danger'
                    : ''
                }
                style={{ fontSize: 15 }}
              >
                {item.status === 'pending'
                  ? 'Pending'
                  : item.status === 'accepted'
                  ? 'Accepted'
                  : item.status === 'rejected'
                  ? 'Rejected'
                  : ''}
              </p>
            )}
          </div>

          <div className="company-name">
            <b>SCHEDULE</b>: {item.job_location} | <b>JOB ID</b>:{item.job_type}|{' '}
            <b>DATE POSTED</b>: {item.created_at}
          </div>
          <div
            className="p-4"
            dangerouslySetInnerHTML={{ __html: item.job_description }}
          ></div>
          <div className="skills-container d-flex justify-content-between">
            <div className="skill">Department: {item.job_department}</div>
            <div className="skill">Category: {item.cat_title}</div>
            <div className="skill">Sub Category: {item.sub_cat_title}</div>

            <div>
              <Link to={'/career/jobs/' + item.id} className="me-2">
                <img
                  height={30}
                  src={require('./../assets/images/eye-svgrepo-com.png')}
                  alt=""
                />
              </Link>
              {type !== 'save_job' && type !== 'applications' && (
                <a
                  href={true}
                  onClick={() => {
                    savejob(item.id)
                  }}
                  className="me-2"
                >
                  <img
                    height={30}
                    title="save job"
                    src={require('./../assets/images/eye-svgrepo-com.png')}
                    alt=""
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
