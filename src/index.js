import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.scss'
import { MantineProvider } from '@mantine/core'
import { AppWrapper } from 'utils/context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <MantineProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </MantineProvider>
  </React.StrictMode>
)
