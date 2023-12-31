import Home from 'pages/Home'
import Recharge from 'pages/Recharge'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAppContext } from './context'
import RechargeAccepted from 'pages/Recharge.Accepted'
import RechargeRejected from 'pages/Recharge.Rejected'
import PendingUsers from 'pages/PendingUsers'

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
              path='/pending-users'
              element={
                // <PrivateRoute>
                <PendingUsers />
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
            <Route
              path='/recharge/accepted'
              element={
                // <PrivateRoute>
                <RechargeAccepted />
                // </PrivateRoute>
              }
            />
            <Route
              path='/recharge/rejected'
              element={
                // <PrivateRoute>
                <RechargeRejected />
                // </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
