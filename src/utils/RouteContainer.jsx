import Home from 'pages/Home'
import Recharge from 'pages/Recharge'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAppContext } from './context'

export default function RoutesContainer({ children }) {
  const { showHamberg } = useAppContext()
  let _display = showHamberg ? 'block' : ''
  let _column = showHamberg ? '2 / span 20' : ''

  return (
    <Router>
      <div className='main'>
        <div className='sidebar' style={{ display: _display }}>
          {children}
        </div>
        <div className='content' style={{ gridColumn: _column }}>
          {/* <Navbar /> */}
          <Routes>
            <Route
              path='/'
              element={
                // <PrivateRoute>
                <Home />
                // </PrivateRoute>
              }
            />
            <Route
              path='/recharge'
              element={
                // <PrivateRoute>
                <Recharge />
                // </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
