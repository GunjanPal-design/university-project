import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Storeuni from './Store/Storeuni.jsx'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Storeuni}>
      <App />
    </Provider>,
  </StrictMode>,
)
