import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import { ToastContainer } from 'react-toastify';

const App = () => {

  const url='http://localhost:4000';
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#243047]">
      <ToastContainer position="top-right" autoClose={2500} />
      <Navbar/>
      <div className="flex min-h-[calc(100vh-81px)] border-t border-[#e8ebf2]">
        <Sidebar/>
        <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
          <Routes>
            <Route path='/add' element={<Add  url={url}/>}/>
            <Route path='/list' element={<List url={url}/>}/>
            <Route path='/orders' element={<Orders url={url}/>}/>
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App