// import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../assets/modal.css'

import Swal from 'sweetalert2'
import useRequest from '../../hooks/useRequest'

export default function JobDetails() {
  const [jobs, setJobs] = useState([])
  const router = useParams()
  const { id } = router
  const [loggedIn] = useState(JSON.parse(window.localStorage.getItem('job_user')))
  const navigate = useNavigate()
  const { data: final, fetchData: apply } = useRequest()
  const { data: jobData, fetchData: fetchJob } = useRequest(`jobdetails/${id}`)

  useEffect(() => {
    fetchJob()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (jobData && jobData?.length !== 0) {
      setJobs(jobData)
    }
  }, [jobData])

  useEffect(() => {
    if (final?.status === 'success') {
      Swal.fire({
        title: 'Job Applied Succesfully',
        icon: 'success',
        confirmButtonText: 'close',
      })
      navigate('/career/applications')
    } else if (final && !Array(final)) {
      Swal.fire({
        title: final.message,
        icon: 'error',
        message: final.message,
        confirmButtonText: 'close',
      })
    }
  }, [final, navigate])

  const [applying_info, setApplyingInfo] = useState({
    job_id: id,
    applicant_id: '',
    cover_letter: '',
    resume: '',
    linkedin_profile: '',
    functional_area: '',
    current_salary: '',
    expected_salary: '',
  })

  useEffect(() => {
    if (loggedIn != null) {
      setApplyingInfo(prev => ({ ...prev, applicant_id: loggedIn.id }))
    }
  }, [loggedIn])

  async function submitInfo(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('uploaded_resume', applying_info.resume)
    formData.append('job_id', applying_info.job_id)
    formData.append('applicant_id', applying_info.applicant_id)
    formData.append('cover_letter', applying_info.cover_letter)
    formData.append('linkeding_url', applying_info.linkedin_profile)
    formData.append('functional_area', applying_info.functional_area)
    formData.append('current_salary', applying_info.current_salary)
    formData.append('expected_salary', applying_info.expected_salary)

    try {
      apply('apply_for_jobs', 'POST', formData)
    } catch (error) {
      console.error(error)
    }
  }
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  const openInfoModal = () => {
    if (loggedIn.date_of_birth == null || loggedIn.house_address == null) {
      Swal.fire({
        title: 'Kindly Update your Profile Up to Appply',
        icon: 'warning',
        // message: 'Kindly Login to Appply',
        confirmButtonText: 'close',
        timer: 1000,
      })
      navigate('/career/profile')
    }
    if (loggedIn == null) {
      Swal.fire({
        title: 'Kindly Sign Up to Appply',
        icon: 'warning',
        // message: 'Kindly Login to Appply',
        confirmButtonText: 'close',
        timer: 1000,
      })
      navigate('/career/register')
    } else {
      setIsInfoModalOpen(true)
    }
  }

  const closeInfoModal = () => {
    setIsInfoModalOpen(false)
  }

  return (
    <div>
      {jobs.lenght <= 0 ? null : (
        <>
          <header className="masthead">
            <div className="container">
              <div className="row">
                <div className="col-md-10 has-text-centered">
                  <div className="site-heading">
                    <h1 className="heading">{jobs.job_title}</h1>
                    <br />
                    <span
                      className="subheading"
                      dangerouslySetInnerHTML={{ __html: jobs.job_description }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div style={{ height: '50px' }}></div>
          <section className="section mb-2 mt-5 pb-6 mb-6">
            <div className="holder">
              <div className="columns">
                <div className="column is-three-quarters mx-auto">
                  <h2>{jobs.job_title}</h2>
                  <p>{jobs.created_at}</p>

                  <div>
                    <h4>Description</h4>
                    <div dangerouslySetInnerHTML={{ __html: jobs.job_description }}></div>
                  </div>
                  <div>
                    <h4>Roles and Responsibilities</h4>
                    <div dangerouslySetInnerHTML={{ __html: jobs.job_roles }}></div>
                  </div>
                  <div>
                    <h4>Qualifications</h4>
                    <div
                      dangerouslySetInnerHTML={{ __html: jobs.job_qualifications }}
                    ></div>
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>{jobs.job_location}</p>
                  </div>
                  <div>
                    <h4>Schedules</h4>
                    <p>{jobs.job_type === 'part_time' ? 'Part Time' : 'Full Time'}</p>
                  </div>
                </div>
                <div>
                  <a href={true} onClick={openInfoModal} className="btn btn-danger">
                    Apply
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {loggedIn != null && isInfoModalOpen && (
        <div className="job_modal_wrapper" id="info_modal">
          <div className="job_modal_wrapper_content w-100">
            <header className="modal-card-head">
              <p className="modal-card-title">Apply for Job</p>
              <button className="modal_close_btn" onClick={closeInfoModal}>
                x
              </button>
            </header>
            <form onSubmit={submitInfo}>
              <section className="modal-card-body">
                <div className="field mb-3">
                  <label className="label">Functional Area</label>
                  <div className="control">
                    <input
                      className="input form-control"
                      ModalContent
                      type="text"
                      // value={}
                      onChange={(e) => {
                        setApplyingInfo({
                          ...applying_info,
                          functional_area: e.target.value,
                        })
                      }}
                      placeholder="please enter your functional Area"
                      id="linkedin_profile"
                    // onChange={}
                    // required
                    />
                  </div>
                </div>

                <div className="field mb-3">
                  <label className="label">Current Salary </label>
                  <div className="control">
                    <input
                      className="input form-control"
                      type="number"
                      // value={}
                      onChange={(e) => {
                        setApplyingInfo({
                          ...applying_info,
                          current_salary: e.target.value,
                        })
                      }}
                      placeholder="please enter your current salary"
                      id="linkedin_profile"
                    // onChange={}
                    // required
                    />
                  </div>
                </div>
                <div className="field mb-3">
                  <label className="label">Expected Salary </label>
                  <div className="control">
                    <input
                      className="input form-control"
                      type="number"
                      // value={}
                      onChange={(e) => {
                        setApplyingInfo({
                          ...applying_info,
                          expected_salary: e.target.value,
                        })
                      }}
                      placeholder="please enter your expected salary "
                      id="linkedin_profile"
                    // onChange={}
                    // required
                    />
                  </div>
                </div>

                <div className="field mb-3">
                  <label className="label">Cover Letter </label>
                  <div className="control">
                    <textarea
                      className="input form-control"
                      type="text"
                      rows={7}
                      cols={12}
                      onChange={(e) => {
                        setApplyingInfo({
                          ...applying_info,
                          cover_letter: e.target.value,
                        })
                      }}
                      id="cover letter"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="field mb-3">
                  <label className="label">Upload Updated CV</label>
                  <div className="select">
                    <input
                      type="file"
                      className="form-control"
                      id="cv_resume"
                      onChange={(e) => {
                        setApplyingInfo({ ...applying_info, resume: e.target.files[0] })
                      }}
                      accept=".pdf, .docx"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">LinkedIn Profile</label>
                  <div className="control">
                    <input
                      className="input form-control"
                      type="url"
                      // value={}
                      onChange={(e) => {
                        setApplyingInfo({
                          ...applying_info,
                          linkedin_profile: e.target.value,
                        })
                      }}
                      placeholder="please enter your linkedin profile if available"
                      id="linkedin_profile"
                    // onChange={}
                    // required
                    />
                  </div>
                </div>
                <div className="field" id="err"></div>
              </section>
              <footer className="modal-card-foot mt-2">
                <button type="submit" className="button is-success btn btn-success m-1">
                  Apply
                </button>
                <button className="button btn m-1" onClick={closeInfoModal}>
                  Cancel
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
