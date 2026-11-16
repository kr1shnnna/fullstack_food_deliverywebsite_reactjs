import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useContext, useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/EditProfile/EditProfile'
import { StoreContext } from './Context/StoreContextDefinition'
const App = () => {

  const [showLogin,setShowLogin]=useState(false)
  const { pathname } = useLocation()
  const { searchTerm } = useContext(StoreContext)
  const isSearchMode = Boolean(searchTerm.trim())
  return (
    <div className="flex min-h-screen flex-col">
    {showLogin?<LoginPopup  setShowLogin={setShowLogin}/>: <></>}
    <div
      className='mx-auto w-full max-w-[1200px] flex-1 px-4'
    >
    <Navbar setShowLogin={setShowLogin} />
    <Routes>
      <Route path='/' element={<Home />} /> 
      <Route path='/cart' element={<Cart />} />
      <Route path='/order' element={<PlaceOrder />} />
      <Route path='/verify' element={<Verify />} />
      <Route path='/myorders' element={<MyOrders />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/edit-profile' element={<EditProfile />} />

    </Routes>

    </div>
    {pathname !== '/cart' && pathname !== '/order' && pathname !== '/myorders' && !isSearchMode && <Footer />}
    </div>
  )
}

export default App