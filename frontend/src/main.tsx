import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Route,Routes,BrowserRouter } from "react-router-dom";
import Upload from './pages/Upload.tsx';
import { Toaster } from 'react-hot-toast';
import { GitHubLogin } from './pages/Login.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster
                position="top-right"  // Change position globally
                toastOptions={{
                    duration: 4000,  // Default duration for all toasts
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        style: {
                            background: '#4caf50',
                        },
                        icon: '🚀',
                    },
                    error: {
                        style: {
                            background: '#f44336',
                        },
                        icon: '❌',
                    },
                    
                }}
            />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/login" element={<GitHubLogin/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
