import React, { useState } from 'react'

// const Profile = () => {

//   return (
//     <div>

//     </div>
//   )
// }

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../url'
import { Country, State } from 'country-state-city'
import Swal from 'sweetalert2'
import { RxAvatar } from 'react-icons/rx'

function Profile() {
  const navigate = useNavigate()
  const [loggedIn] = useState(JSON.parse(window.localStorage.getItem('job_user')))
  const [notify, setNotify] = useState('')
  const [updated, setUpdated] = useState('')
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    country: '',
    state: '',
    lga: '',
    phone: '',
    marital_status: '',
    house_address: '',
    national_id_no: '',
    date_of_birth: '',
  })

  useEffect(() => {
    if (loggedIn.date_of_birth == null || loggedIn.house_address == null) {
      setNotify('Kindly Update Your Profile Details')
      setIsInfoModalOpen(true)
    }
  }, [loggedIn])
  useEffect(() => {
    if (loggedIn === null) {
      navigate('/career/login')
    } else if (loggedIn.email_verified_at == null) {
      navigate('/career/verify')
    } else {
      setUser({
        first_name: loggedIn.first_name,
        last_name: loggedIn.last_name,
        country: loggedIn.country,
        state: loggedIn.state_of_origin,
        lga: loggedIn.lga,
        phone: loggedIn.phone_number,
        marital_status: loggedIn.marital_status,
        house_address: loggedIn.house_address,
        national_id_no: loggedIn.national_id_no,
        date_of_birth: loggedIn.date_of_birth,
      })
    }
  }, [loggedIn, navigate, updated])

  const countryList = Country.getAllCountries()
  const [cont, setcont] = useState('')
  const states = State.getStatesOfCountry(cont)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false)

  const openInfoModal = () => {
    setIsInfoModalOpen(true)
  }

  const closeInfoModal = () => {
    setIsInfoModalOpen(false)
  }

  const closePhoneModal = () => {
    setIsPhoneModalOpen(false)
  }

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    })
  }

  const submitInfo = (event) => {
    event.preventDefault()

    const data = {
      applicantId: loggedIn.id,
      first_name: user.first_name,
      last_name: user.last_name,
      country: user.country,
      state: user.state,
      phone: user.phone_number,
      marital_status: user.marital_status,
      house_address: user.house_address,
      national_id_no: user.national_id_no,
      date_of_birth: user.date_of_birth,
    }
    const url = `${API_URL}/applicant_info_update`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Failed to fetch data')
        }
      })
      .then((data) => {
        if (data.status === 'success') {
          Swal.fire({
            text: data.message,
            icon: 'success',
            timer: 1000,
          })
          window.localStorage.setItem('job_user', JSON.stringify(data.data))
          setIsInfoModalOpen(false)

          setUpdated(Math.random())
          window.location.reload()
        } else {
          Swal.fire({
            icon: 'error',
            text: data.message,
            timer: 1000,
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const [password, setPassword] = useState({
    password: '',
    newPassword: '',
    confirm_password: '',
  })

  const submitPassword = (event) => {
    event.preventDefault()

    if (password.newPassword !== password.confirm_password) {
      Swal.fire({
        icon: 'error',
        text: 'password do not match',
        timer: 1000,
      })
    } else {
      const data = {
        applicantId: loggedIn.id,
        newPassword: password.newPassword,
        oldpassword: password.password,
      }
      const url = `${API_URL}/applicant_change_password`
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Failed to fetch data')
          }
        })
        .then((data) => {
          if (data.status === 'success') {
            Swal.fire({
              text: data.message,
              icon: 'success',
              timer: 1000,
            })
            setUpdated(Math.random())
          } else {
            Swal.fire({
              icon: 'error',
              text: data.message,
              timer: 5000,
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const submitPhoneNumber = (event) => {
    event.preventDefault()
    // Implement your logic to submit phone number changes here
  }

  return (
    <div>
      <header className="masthead">
        <div className="container">
          <div className="row">
            <div className="col-md-10 has-text-centered">
              <div className="site-heading">
                <h1 className="heading">Profile Page</h1>
                <br />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        style={{
          height: '200px',
        }}
      ></div>
      <section className="section mb-2 pb-6 ">
        <center>
          <p className="text-danger">{notify}</p>
        </center>
        <div className="holder mb-6 py-1">
          <div className="box">
            <RxAvatar size={200} />

            <div className="content px-4">
              <h3>
                Personal Details{' '}
                <span
                  className="is-pulled-right"
                  style={{ fontSize: '18px', color: 'gray', cursor: 'pointer' }}
                  onClick={openInfoModal}
                >
                  Edit{' '}
                  <i
                    className=" ri-edit-2-line"
                    style={{ marginBottom: '-50vh', position: 'absolute' }}
                  ></i>
                </span>
              </h3>

              <div className="d-lg-flex justify-content-between">
                <div>
                  {loggedIn != null && (
                    <>
                      <p className="mt-4">
                        <b>Name:</b> {loggedIn.first_name} {loggedIn.last_name}
                        <br />
                      </p>
                      <p>
                        <b>Country:</b> {loggedIn.country}
                      </p>
                      <p>
                        <b>State:</b> {loggedIn.state_of_origin}
                      </p>
                    </>
                  )}
                </div>

                <div>
                  {loggedIn != null && (
                    <>
                      <p className="mt-4">
                        <b>Date of Birth:</b> {loggedIn.date_of_birth}
                        <br />
                      </p>
                      <p>
                        <b>National Id No:</b> {loggedIn.national_id_no}
                      </p>
                      <p>
                        <b>Home Addres:</b> {loggedIn.house_address}
                      </p>
                      <p>
                        <b>Marital Status:</b> {loggedIn.marital_status}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="box">
            <div className="content px-4">
              <h3>
                Contact{' '}
                {/* <span
                  className="is-pulled-right"
                  style={{ fontSize: '18px', color: 'gray', cursor: 'pointer' }}
                  onClick={openPhoneModal}
                >
                  Edit{' '}
                  <i
                    className=" ri-edit-2-line"
                    style={{ marginBottom: '-50vh', position: 'absolute' }}
                  ></i>
                </span> */}
              </h3>
              <p className="mt-4">
                <b>Email address:</b> {loggedIn.email_address}
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="box">
            <form className="content px-4" onSubmit={submitPassword}>
              <h3>Security</h3>
              <div className="field mb-3">
                <label className="label">Old Password</label>
                <div className="control">
                  {' '}
                  <input
                    className="input form-control"
                    type="password"
                    placeholder="Old Password"
                    id="old_pass"
                    onChange={(e) => {
                      setPassword({ ...password, password: e.target.value })
                    }}
                    required
                  />
                </div>
              </div>
              <div className="field mb-3">
                <label className="label">New Password</label>
                <div className="control">
                  <input
                    className="input form-control"
                    type="password"
                    placeholder="New Password"
                    id="pass"
                    onChange={(e) => {
                      setPassword({ ...password, newPassword: e.target.value })
                    }}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    className="input form-control"
                    type="password"
                    placeholder="Confirm Password"
                    id="conf_pass"
                    onChange={(e) => {
                      setPassword({ ...password, confirm_password: e.target.value })
                    }}
                    required
                  />
                </div>
              </div>
              <div className="field" id="err_pass"></div>
              <div className="field is-grouped mt-4">
                <div className="control">
                  <button className="button is-link btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {isInfoModalOpen && (
          <div className="job_modal_wrapper" id="">
            <div
              style={{ maxWidth: '700px' }}
              className="px-5 w-100 job_modal_wrapper_content"
            >
              <center>
                <p className="text-danger">{notify}</p>
              </center>
              <header className="">
                <p className="modal-card-title">Change Personal Info</p>
                <button className="modal_close_btn" onClick={closeInfoModal}>
                  x
                </button>
              </header>
              <form onSubmit={submitInfo}>
                <section className="">
                  <div className="">
                    <label className="label">First Name</label>
                    <div className="control mb-3">
                      <input
                        className="input form-control"
                        type="text"
                        value={user.first_name}
                        id="first_name"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="">
                    <label className="label">Last Name</label>
                    <div className="control mb-3">
                      <input
                        className="input form-control"
                        type="text"
                        value={user.last_name}
                        id="last_name"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="">
                    <label className="label">Date of Birth</label>
                    <div className="control mb-3">
                      <input
                        className="input form-control"
                        type="date"
                        value={user.date_of_birth}
                        id="date_of_birth"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label>Marital Status</label>
                    <select
                      placeholder="Marital Status"
                      name="marital_status"
                      id="marital_status"
                      value={user.marital_status === undefined ? '' : user.marital_status}
                      onChange={onChange}
                      className="form-control mb-3"
                    >
                      <option selected value="Single">
                        Single
                      </option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>

                  <div className="">
                    <label className="label">
                      National ID,NIMC, Driver License, Passport Num
                    </label>
                    <div className="control mb-3">
                      <input
                        className="input form-control"
                        type="text"
                        value={user.national_id_no}
                        id="national_id_no"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <select
                    placeholder="Country"
                    name="country"
                    id="country"
                    // value={user.country}
                    onChange={(e) => {
                      const selectedCountry = countryList.find(
                        (item) => item.name === e.target.value
                      )
                      setcont(selectedCountry ? selectedCountry.isoCode : '')
                      onChange(e)
                    }}
                    className="form-control mb-3"
                  >
                    {countryList.map((item, index) => {
                      return (
                        <option value={item.name}>
                          {item.flag}
                          {item.name}{' '}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    placeholder="State of Origin"
                    id="state"
                    name="state"
                    // value={user.state}
                    onChange={onChange}
                    className="form-control mb-3"
                  >
                    <option>--Select state of origin---</option>
                    {states.map((item, index) => {
                      return (
                        <option value={item.name} key={index}>
                          {item.flag}
                          {item.name}{' '}
                        </option>
                      )
                    })}
                  </select>
                  <div className="">
                    <label className="label">Address</label>
                    <div className="control">
                      <input
                        className="input form-control"
                        type="text"
                        value={user.house_address}
                        id="house_address"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="" id="err"></div>
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

        {isPhoneModalOpen && (
          <div className="job_modal_wrapper" id="phone_modal">
            <div className="job_modal_wrapper_content modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Change Phone Number</p>
                <button className="modal_close_btn" onClick={closePhoneModal}>
                  x
                </button>
              </header>
              <form onSubmit={submitPhoneNumber}>
                <section className="modal-card-body">
                  <div className="">
                    <label className="label">Phone Number</label>
                    <div className="control">
                      <input
                        className="input form-control"
                        type="text"
                        value={user.phone}
                        id="phone"
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field" id="err_num"></div>
                </section>
                <footer className="modal-card-foot mt-2">
                  <button type="submit" className="button is-success btn btn-success m-1">
                    Apply
                  </button>
                  <button className="button btn m-1" onClick={closePhoneModal}>
                    Cancel
                  </button>
                </footer>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Profile

// export default Profile
