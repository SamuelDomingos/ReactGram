import './App.css'

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Pages
import Home from './Pages/Home/Home'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'

// Hooks
import {useAuth} from "./hooks/UserAuth";

// Compontens
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import EditProfile from './Pages/editProfile/EditProfile'
import Profile from './Pages/Profile/Profile'
import Photo from './Pages/Photo/Photo'
import Search from './Pages/Search/Search'

function App() {
  const [auth, loading] = useAuth();
  
  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
          <div className="container">
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
            <Route path="/editProfile" element={auth ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to="/login" />} />
            <Route path="/search" element={auth ? <Search /> : <Navigate to="/login" />} />
            <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
          </Routes>
          </div>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
