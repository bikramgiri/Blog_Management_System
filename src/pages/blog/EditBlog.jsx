// import React from 'react'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Form from './components/form/Form'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../config'

  const EditBlog = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [blog, setBlog] = useState({})


    // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target
    if (type === "file") {
      setBlog({ ...blog, image: e.target.files[0] })
    } else {
      setBlog({ ...blog, [name]: value })
    }
  }


  // const handleChange = (e) => {
	// 	const {name,value} = e.target
	// 	setBlog({
	// 		...blog,
	// 		[name]: name === "image" ? e.target.files[0] : value
  //     // [name] : value
	// 	})
	// }


  // Edit blog function
  const editBlog = async (updatedBlog) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedBlog.title);
      formData.append("subtitle", updatedBlog.subtitle);
      formData.append("category", updatedBlog.category);
      formData.append("description", updatedBlog.description);
      if (updatedBlog.image instanceof File) {
        formData.append("image", updatedBlog.image);
      }

      const response = await axios.patch(`${baseUrl}/blog/${id}`, formData, {
        headers: {
          "Authorization": localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      })

      if (response.status === 200) {
        navigate(`/blog/${id}`)
      } else {
        alert("Something went wrong. Try again!")
      }
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  }


  // //edit product
  // const editBlog = async (e)=>{
  //   e.preventDefault()
  //   try {
  //     const response = await axios.patch(`${baseUrl}/blog/${id}`,blog,{
  //       headers: { // for files upload we need to set the content type to multipart/form-data in the headers
  //         'Authorization': localStorage.getItem("token"),
  //         "Content-Type": "multipart/form-data"
  //       }
  //     })
  //     if(response.status === 200){
  //       navigate(`/blog/${id}`)
  //     }else{
  //       alert("Something went wrong. Try again!")
  //     }
  //   } catch (error) {
  //     alert(error?.response?.data?.message)
  //   }
  // }


  // fetch blog by id
  const fetchBlog = async ()=>{
    const response = await axios.get(`${baseUrl}/blog/${id}`)
      if(response.status === 200){
       setBlog(response.data.data)
    }
  }

    useEffect(()=>{
      fetchBlog()
    },[])

  return (
    <Layout>
      <Form type="edit" onSubmit={editBlog} onChange={handleChange} initialData={blog} />
    </Layout>
  )
}

export default EditBlog