import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { UserProvider } from './contexts/userContext.context.jsx'
import { StickyNotesProvider } from './contexts/stickyNotesContext.context.jsx'
import { SideBarProvider } from './contexts/sideBarContext.context.jsx'

import '../styles/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <StickyNotesProvider>
          <SideBarProvider>
            <App />
          </SideBarProvider>
        </StickyNotesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
