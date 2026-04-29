import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../assets/login.css'
import useRequest from '../../hooks/useRequest'

function LoginOtp() {
  const router = useParams()

  const { token } = router

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  // eslint-disable-next-line
  const [password, _setPassword] = useState('')
  const { data, fetchData: login, loading } = useRequest()
  const {
    fetchData: verifyEmail,
    data: emailVerification,
    // loading: verifyLoading,
  } = useRequest()
  const {
    fetchData: changePassword,
    data: passwordChanged,
    // loading: changeLoading,
  } = useRequest()

  useEffect(() => {
    if (data?.status === 'success') {
      Swal.fire({
        title: 'Login Success',
        text: data.message,
      })
      window.localStorage.setItem('job_user', JSON.stringify(data?.user))

      if (data?.user.date_of_birth === null || data.user.house_address === null) {
        navigate('/career/profile')
      } else {
        navigate('/career/applications')
      }
    } else if (data?.status === 'error') {
      Swal.fire({
        title: 'Login Failure',
        text: data.message,
      })
    }
  }, [data, navigate])

  useEffect(() => {
    if (emailVerification?.status === 'success') {
      Swal.fire({
        text: emailVerification?.message,
        icon: 'success',
      })
      setLoader(false)
    } else if (emailVerification?.status === 'error') {
      Swal.fire({
        icon: 'error',
        text: emailVerification?.message,
      })
      setLoader(false)
    }
  }, [emailVerification])

  useEffect(() => {
    if (passwordChanged?.status === 'success') {
      Swal.fire({
        text: passwordChanged?.message,
        icon: 'success',
      })
      setLoader(false)
      navigate('/career/login')
    } else if (passwordChanged?.status === 'error') {
      Swal.fire({
        icon: 'error',
        text: passwordChanged?.message,
      })
      setLoader(false)
    }
  }, [navigate, passwordChanged])

  const handleLogin = (e) => {
    e.preventDefault()
    login('login_Otp_request', 'POST', { email, password })
  }

  const [forget /*, setForgot*/] = useState(false)
  const [loader, setLoader] = useState(false)
  const [new_password, setNew_password] = useState('')

  const handleforgot = (e) => {
    e.preventDefault()
    setLoader(true)
    const data = {
      email: email,
      url: window.location.origin,
    }
    verifyEmail('verify_email', 'POST', data)
  }

  const forgotpassword = (e) => {
    e.preventDefault()
    setLoader(true)

    const data = {
      new_password: new_password,
      token: token,
    }
    changePassword('change_password', 'POST', { ...JSON.stringify(data) })
  }

  const setResendOtp = (e) => {
    e.preventDefault()
    login('login_Otp_request', 'POST', { email, password })
  }

  return (
    <>
      {token == null ? (
        <>
          {!forget ? (
            <div className="login_container">
              <form onSubmit={handleLogin}>
                <p className="container_title">Enter OTP</p>
                <small>An otp was sent to your mail please check and enter</small>
                <input
                  className="input"
                  type="email"
                  placeholder="Enter OTP"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="button" type="submit">
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                {!loading ? (
                  <>
                    {/* <Link to="/career">
              <Button type="button">Back Home</Button>
            </Link> */}
                    <div className="mt-3" style={{ fontSize: 12 }}>

                      <button
                        type="button"
                        onClick={() => {
                          setResendOtp()
                        }}
                        className="btn btn-outline"
                      >
                        Resend OTP
                      </button>
                    </div>

                    <div className="mt-3">
                      Don't have an account? <Link to="/career/register">Signup</Link>
                    </div>
                  </>
                ) : null}
              </form>
            </div>
          ) : (
            <div className="login_container">
              <form onSubmit={handleforgot}>
                <p className="container_title">Forget Password</p>
                <input
                  type="email"
                  placeholder="enter the email you registered with"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                />
                <button className="button" type="submit">
                  {loader ? 'Verifying' : 'Reset'}
                </button>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="login_container">
          <form onSubmit={forgotpassword}>
            <p className="container_title">Enter New Password</p>
            <input
              type="password"
              placeholder="enter a new password"
              value={new_password}
              onChange={(e) => setNew_password(e.target.value)}
              required
              className="input"
            />
            <button className="button" type="submit">
              {loader ? 'Verifying' : 'Reset'}
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default LoginOtp
