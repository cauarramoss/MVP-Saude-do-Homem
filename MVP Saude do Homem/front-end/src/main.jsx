import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Register from './pages/Register/RegisterPage'
import Home from './pages/Home/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import ErrorPage from './pages/error/ErrorPage';
import LoginPage from './pages/Login/LoginPage';
import ReportPage from './pages/Report/ReportPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />
  },

  {
    path: "register",
    element: <Register />
  },

  {
    path: "home",
    element: <Home />
  },

  {
    path: "login",
    element: <LoginPage />
  },

  {
    path: "report",
    element: <ReportPage />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)