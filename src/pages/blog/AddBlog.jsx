// import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Layout from '../../components/layout/Layout'
import Form from './components/form/Form'
import { baseUrl } from '../../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
  const navigate = useNavigate()
  const handleCreateBlog = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/blog`,data,{
        headers: { // for files upload we need to set the content type to multipart/form-data in the headers
          "Content-Type": "multipart/form-data",  // set the content type in the headers
          "Authorization": localStorage.getItem("token") // set the token in the headers
        }
      })
      if(response.status === 201){
        navigate("/")
    }else{
      alert("Failed to create blog")
    }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
}
  return (
      <Layout>
		<Form type="create" onSubmit={handleCreateBlog}/>
      </Layout>
  )
}

export default AddBlog