// import React from 'react'
import { useNavigate } from 'react-router-dom'
import Form from './components/Form/Form'
import axios from 'axios'
import { baseUrl } from '../../config'

const Register = () => {
  const navigate = useNavigate()
  const handleRegister = async (data)=>{
    try {
      const response = await axios.post(`${baseUrl}/register`,data)
    if(response.status == 201){
      navigate("/login")
    }else{
      alert("Registration failed")
    }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }
  return (
	<Form type="Register" onSubmit={handleRegister}/>
  )
}

export default Register