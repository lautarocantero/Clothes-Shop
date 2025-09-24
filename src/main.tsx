import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import 'animate.css';
import LegacyShopApp from './LegacyShopApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LegacyShopApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
