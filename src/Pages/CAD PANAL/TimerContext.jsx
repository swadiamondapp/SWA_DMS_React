import React, { createContext, useState } from 'react'

export const ContextTime = createContext()

const TimerContext = ({children}) => {

    const [cadTime , setCadTime] = useState("")

  return (
    <ContextTime.Provider value={{cadTime , setCadTime}}>
        {children}
    </ContextTime.Provider>
  )
}

export default TimerContext
