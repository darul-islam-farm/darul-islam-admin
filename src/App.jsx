import Sidebar from 'components/home/Sidebar'
import React from 'react'
import RoutesContainer from 'utils/RouteContainer'

export default function App() {
  return (
    <RoutesContainer>
      <Sidebar />
    </RoutesContainer>
  )
}
