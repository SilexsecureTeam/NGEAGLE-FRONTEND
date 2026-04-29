import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../assets/register.css'

import { Country, State } from 'country-state-city'
// import { API_URL } from '../url'
import useRequest from '../../hooks/useRequest'

function Register() {
  const navigate = useNavigate()
  const country = Country.getAllCountries()
  const [cont, setcont] = useState('')

  const path = useLocation()

  const { pathname } = path

  const [formData, setFormData] = useState({
    first_name: '',
    email_address: '',
    last_name: '',
    country: '',
    state_of_origin: '',
    lga: 'nill',
    password: '',
    confirmPassword: '',
  })

  const states = State.getStatesOfCountry(cont)
  // const cities = City.getCitiesOfState(formData.country, formData.state_of_origin);

  const { confirmPassword, ...rest } = formData
  const [notify, setNotify] = useState('')
  const { data, fetchData: register, loading } = useRequest()
  const { data: emailVerification, fetchData: verEmail, loading: veLoading } = useRequest()
  const { data: otpResend, fetchData: rOtp, loading: rLoading } = useRequest()

  useEffect(() => {
    if (data.status === 'success') {
      Swal.fire({
        title: 'Login Success',
        text: data.message,
        timer: 1000,
      })
      window.localStorage.setItem('job_user', JSON.stringify(data.user))
      navigate('/career/applications')
    } else if (data?.status === 'error') {
      Swal.fire({
        title: 'Login Failure',
        text: data.message,
        timer: 1000,
      })
      setNotify(data.message)
    }
  }, [data, navigate])

  useEffect(() => {
    if (emailVerification?.status === 'success') {
      Swal.fire({
        text: emailVerification?.message,
        icon: 'success',
        timer: 1000,
      })
      window.localStorage.setItem('job_user', JSON.stringify(emailVerification?.resut))
      setLoader(false)
      navigate('/career/profile')
    } else if (emailVerification?.status === 'error') {
      Swal.fire({
        icon: 'error',
        text: emailVerification?.message,
        timer: 1000,
      })
      setLoader(false)
    }
  }, [emailVerification, navigate])

  useEffect(() => {
    if (otpResend?.status === 'success') {
      Swal.fire({
        text: otpResend?.message,
        icon: 'success',
        timer: 1000,
      })
      setLoader(false)
      // navigate('/career/applications')
    } else if (otpResend?.status === 'error') {
      Swal.fire({
        icon: 'error',
        text: otpResend?.message,
        timer: 1000,
      })
      setLoader(false)
    }
  }, [otpResend, navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    setNotify('')
    register('job_signup', 'POST', { ...rest })
  }

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const [token_email, setTokenEmail] = useState('')
  // eslint-disable-next-line
  const [_loader, setLoader] = useState(false)

  const checkPassword = () => {
    return rest.password !== confirmPassword
  }

  const verifyEmail = (e) => {
    const loggedIn = JSON.parse(window.localStorage.getItem('job_user'))

    e.preventDefault()
    setLoader(true)
    const data = {
      token: token_email,
      email: loggedIn.email_address
    }

    verEmail('verify_email_token', 'POST', data)
  }

  const resendOtp = (e) => {
    e.preventDefault()
    const loggedIn = JSON.parse(window.localStorage.getItem('job_user'))

    setLoader(true)
    const data = {
      email: loggedIn.email_address,
    }
    rOtp('resend_otp', 'POST', data)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
      {!pathname.includes('verify') ? (
        <div className="register_card">
          <form onSubmit={handleLogin}>
            <p style={{ color: 'red' }}> {notify !== '' && notify}</p>
            <h2 className="register_title">Register Now</h2>
            <div className="grid_container">
              <input
                type="email"
                placeholder="Email Address"
                name="email_address"
                value={rest.email_address}
                onChange={onChange}
                className="input"
                required
              />
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                value={rest.first_name}
                onChange={onChange}
                className="input"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={rest.last_name}
                className="input"
                onChange={onChange}
                required
              />

              <select
                placeholder="Country"
                name="country"
                value={rest.country}
                onChange={(e) => {
                  const selectedCountry = country.find(
                    (item) => item.name === e.target.value
                  )
                  setcont(selectedCountry ? selectedCountry.isoCode : '')
                  onChange(e)
                }}
                className="form-control"
              >
                {country.map((item, index) => {
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
                name="state_of_origin"
                value={rest.state_of_origin}
                onChange={onChange}
                className="form-control"
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

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={rest.password}
                onChange={onChange}
                className="fullwidth"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                style={{ columnSpan: '2' }}
                className="fullwidth"
                required
              />
            </div>
            <button className="mt-3 button" type="submit" disabled={checkPassword()}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            {!loading ? (
              <>
                {/* <Link to="/career">
              <Button type="button">Back Home</Button>
            </Link> */}
                <div className="mt-3">
                  Already have an account? <Link to="/career/login">Login</Link>
                </div>
              </>
            ) : null}
          </form>
        </div>
      ) : (
        <div className="register_card">
          <form onSubmit={verifyEmail}>
            <p style={{ color: 'red' }}> {notify !== '' && notify}</p>
            <h2 className="">Verify Email Address</h2>
            <div className="grid_container">
              <input
                type="text"
                placeholder="enter the six digit code sent to your mail"
                name=""
                value={token_email}
                onChange={(e) => {
                  setTokenEmail(e.target.value)
                }}
                style={{ columnSpan: '2', textAlign: 'center', fontSize: 30 }}
                required
                className="fullwidth"
              />
            </div>
            <div className="d-flex g-3">
              <button className="mt-3 me-3 button" type="submit">
                {veLoading ? 'Verifying...' : 'Verify Email'}
              </button>
              <button onClick={resendOtp} className="mt-3 button" type="button">
                {rLoading ? 'Resending...' : 'Resend OTP'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Register
