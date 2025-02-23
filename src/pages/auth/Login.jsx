// import React from 'react'
import { useNavigate } from 'react-router-dom'
import Form from './components/Form/Form'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const handleLogin = async (data)=>{
    try {
      const response = await axios.post("https://react30.onrender.com/api/user/login",data)
    if(response.status == 200){
      navigate("/")
    }else{
      alert("Login failed")
    }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }


  return (
	<Form type="Login" onSubmit={handleLogin}/>
  )
}

export default Login