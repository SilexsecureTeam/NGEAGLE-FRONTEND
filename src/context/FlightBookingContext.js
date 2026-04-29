import { createContext } from 'react'

import { useState } from 'react'
import passangersDatas from '../PassengersData'

export const PassangersContext = createContext({
  allPasangers: [],
  addOnePassanger: () => {},
  removeOnePassanger: () => {},
})

const PassangersProvider = ({ children }) => {
  const [passangers, setPassangers] = useState(passangersDatas)

  // Fucntion to add one passanger
  function addOnePassanger(id) {
    setPassangers(
      passangers.map(
        // Maps through the passangers array state.
        (passanger) =>
          passanger.id === id // Check if the id passed is equal to the id of each passanger
            ? { ...passanger, quantity: passanger.quantity + 1 } // Add one to the quantity of the passager which id is eqaul to the id passes
            : passanger // Returns the passanger that isnt equal to the id as it is
      )
    )
  }

  // Function to remove one passanger
  function removeOnePassanger(id) {
    setPassangers(
      passangers.map(
        // Maps through the passangers array state.
        (passanger) =>
          passanger.id === id // Check if the id passed is equal to the id of each passanger
            ? {
                ...passanger,
                quantity: passanger.quantity >= 1 ? passanger.quantity - 1 : 0,
              } // Add one to the quantity of the
            : // passager which id is eqaul to the id passes
              passanger // Returns the passanger that isnt equal to the id as it is
      )
    )
  }

  const ContextValue = {
    allPasangers: passangers,
    addOnePassanger,
    removeOnePassanger,
  }

  return (
    <PassangersContext.Provider value={ContextValue}>
      {children}
    </PassangersContext.Provider>
  )
}

export default PassangersProvider
