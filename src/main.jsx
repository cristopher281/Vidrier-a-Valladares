import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ProductProvider } from './context/ProductContext'
import { RawMaterialsProvider } from './context/RawMaterialsContext'
import { WoodProductProvider } from './context/WoodProductContext'
import './styles/index.css'
import './styles/responsive.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <RawMaterialsProvider>
          <WoodProductProvider>
            <App />
          </WoodProductProvider>
        </RawMaterialsProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
)
