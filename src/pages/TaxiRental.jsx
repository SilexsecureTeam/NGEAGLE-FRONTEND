import React from 'react'
import TaxiRentalHeader from '../component/TaxiRentals/TaxiRentalHeader'
import '../style/taxiRental.css'
import TaxiRentalBody from '../component/TaxiRentals/TaxiRentalBody'

const TaxiRental = () => {
  return (
    <>
      <TaxiRentalHeader />
      <center className="my-5">
        <h1>Airport Rental Services</h1>
      </center>
      <TaxiRentalBody />
    </>
  )
}

export default TaxiRental
