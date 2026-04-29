import { useContext } from 'react'
import '../style/PassangersControls.css'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { PassangersContext } from '../context/FlightBookingContext'

const PassangersControls = ({ passanger: { id, type, quantity } }) => {
  // function logToConsole(id) {
  //     console.log(id);
  // }

  // Passangers context
  const passanger = useContext(PassangersContext)

  return (
    <div className="styled-passengers-controls">
      <p>{type}</p>

      <div>
        <FaMinusCircle size="1.2rem" onClick={() => passanger.removeOnePassanger(id)} />

        <span>{quantity}</span>

        <FaPlusCircle size="1.2rem" onClick={() => passanger.addOnePassanger(id)} />
      </div>
    </div>
  )
}

export default PassangersControls
