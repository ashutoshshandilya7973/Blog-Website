import ForgetPassword from "./pages/Password/ForgetPassword.jsx"
import ResetPassword from "./pages/Password/ResetPassword.jsx"
import Login from "./pages/Login/Login.jsx"
import Register from "./pages/Register/Register.jsx"
import { Routes,Route } from "react-router-dom"
import CreatePost from "./pages/post/CreatePost.jsx"
import Editor from "./pages/post/Editor.jsx"
import './index.css'
import TipTap from "./pages/post/TipTap.jsx"
function App() {
  return (
    <>
          {/* <Routes>
               <Route path="/login" element={<Login/>} />
               <Route path="/register" element={<Register/>}/>
               <Route path="/forget-password" element={<ForgetPassword/>}/>
               <Route path="/reset-password" element={<ResetPassword/>}/>
          </Routes> */}
          <CreatePost/>
          {/* <Editor/> */}
          {/* <TipTap/> */}
          
          
    </>
  )
}

export default App
