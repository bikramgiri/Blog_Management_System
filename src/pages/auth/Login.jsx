// import React from 'react'
import { useNavigate } from 'react-router-dom'
import Form from './components/Form/Form'
import axios from 'axios'
import { baseUrl } from '../../config'

const Login = () => {
  const navigate = useNavigate()
  const handleLogin = async (data)=>{
    try {
      const response = await axios.post(baseUrl + "/login",data)
    if(response.status == 200){
      localStorage.setItem("token",response.data.token)
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