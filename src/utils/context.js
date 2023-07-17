import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [showHamberg, setShowHamberg] = useState(false)

  return (
    <AppContext.Provider value={{ showHamberg, setShowHamberg }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
