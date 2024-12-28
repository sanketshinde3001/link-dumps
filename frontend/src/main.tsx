import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Route,Routes,BrowserRouter } from "react-router-dom";
import Upload from './pages/Upload.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/upload" element={<Upload/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
