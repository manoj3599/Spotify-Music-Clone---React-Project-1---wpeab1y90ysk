import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './UserProvider.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Make sure to include CSS for Toastify


createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
    <UserProvider> 
    
    <App />
</UserProvider>

</BrowserRouter>
 
)
