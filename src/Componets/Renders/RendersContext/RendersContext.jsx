import React, { createContext, useState } from 'react'


export const RenderCreateContext = createContext()

const RendersContext = ({children}) => {

    const [renderProductId,setRenderProductId] = useState([])

  return (
    <RenderCreateContext.Provider value={{renderProductId,setRenderProductId}}>
        {children}
    </RenderCreateContext.Provider>
  )
}

export default RendersContext
