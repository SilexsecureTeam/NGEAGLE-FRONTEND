import React, { useEffect, useState } from 'react'
import useRequest from '../../hooks/useRequest'
import fetchImages from '../../hooks/useFetchImages'
import bagIcon2 from '../../images/bagIcon2.png'
import { usePaystackPayment } from 'react-paystack'
import '../../style/cabin.css'
import Swal from 'sweetalert2'

const Cabin = () => {
  const { fetchData, data, error, loading } = useRequest('cabin', 'POST')
  const { fetchData: fetchPrice, data: price } = useRequest('baggage-price', 'POST')
  const {
    fetchData: validatePayment,
    data: payment,
    loading: validateLoading,
  } = useRequest()

  const [kg, setKg] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone_number: '',
    ticket_number: '',
  })
  const { email, name, phone_number, ticket_number } = formData

  useEffect(() => {
    fetchData()
    fetchPrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!Array.isArray(payment)) {
      setOpenModal(false)
      setFormData({ email: '', name: '', phone_number: '', ticket_number: '' })
      setKg(1)
      Swal.fire('Good job!', 'You will receive a confirmation email soon!', 'success')
    }
  }, [payment])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: price?.price * kg * 100,
    publicKey: 'pk_test_7ce279d181176a0c0af488855daf72c19ca5ff8e',
  }
  const initializePayment = usePaystackPayment(config)

  const onSuccess = (reference) => {
    validatePayment(
      `verify-payment/${reference.reference}?kg=${kg}&name=${name}&email=${email}&phone=${phone_number}&ticketNumber=${ticket_number}`,
      'GET'
    )
  }

  const onClose = () => {
    console.log('closed')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (kg > 0) {
      setOpenModal(true)
    }
  }

  return (
    <>
      {!loading && !error ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 prime_bg2">
              <form onSubmit={onSubmit} className="p-4 text-white position-relative">
                <p className="my-5">Do you need extra baggage?</p>
                <div className="d-flex col-10 col-md-7 justify-content-between align-items-center">
                  <div className="col-4 ms-3">
                    <img
                      src={bagIcon2}
                      alt=""
                      style={{ width: '70px', height: '60px' }}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      value={kg}
                      onChange={(e) => setKg(e.target.value)}
                      className="form-control rounded-0 inherit_bg"
                      id="exampleFormControlInput1"
                      style={{ height: '50px' }}
                      required
                    />
                  </div>
                </div>
                <p className="text-center fs-4 my-5">NGN {price?.price * kg}</p>
                <div style={{ width: 'fit-content' }} className="mx-auto mb-5 pb-5">
                  <button
                    type="submit"
                    className="p-3  fs-4 fw-semibold text-white inherit_bg border"
                  >
                    PURCHASE NOW
                  </button>
                </div>
              </form>
              <span className="px-2 bg-white text-black position-absolute top-0 start-50 translate-middle">
                Extra Baggage?
              </span>
            </div>
            <div className="col-md-6 mb-4">
              {data?.map((cabin, index) => (
                <div key={index} className="border border-2 mb-5 p-4 position-relative">
                  <div className="row align-items-center ">
                    <div className="col-6">
                      <div>
                        <img
                          src={fetchImages(cabin?.image)}
                          // src={fetchImages('Cabin', cabin?.image)}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="">
                        <p className="fw-bold">{cabin?.title}</p>
                        <div className="fs_xsm">
                          <pre>{cabin?.description}</pre>
                          {/* <p className="mb-0">55x40x23 cm </p>
                          <p className="mb-0">(Width x Length x Height)</p>
                          <p className="mt-4 prime_text1 fw-bold">Maximum 8 kg</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-2 prime_bg2 text-white position-absolute top-0 start-50 translate-middle">
                    Carbin Baggage?
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {openModal ? (
        <div className="cabin_modal_wrapper">
          <div className="cabin_modal_content">
            <button className="cabin_close_button" onClick={() => setOpenModal(false)}>
              x
            </button>
            <h6>Complete the details to proceed with payment:</h6>
            <input
              type="text"
              value={name}
              name="name"
              onChange={onChange}
              disabled={validateLoading}
              placeholder="Name..."
              className="cabin_input"
            />
            <input
              type="email"
              value={email}
              name="email"
              onChange={onChange}
              disabled={validateLoading}
              placeholder="Email address..."
              className="cabin_input"
            />
            <input
              type="number"
              value={phone_number}
              name="phone_number"
              onChange={onChange}
              disabled={validateLoading}
              placeholder="Phone Number..."
              className="cabin_input"
            />
            <input
              type="text"
              value={ticket_number}
              name="ticket_number"
              onChange={onChange}
              disabled={validateLoading}
              placeholder="Ticket number"
              className="cabin_input"
            />
            <button
              onClick={() => {
                initializePayment(onSuccess, onClose)
              }}
              disabled={validateLoading}
              className="cabin_paynow"
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Cabin
