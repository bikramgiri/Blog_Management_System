// import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Layout from '../../components/layout/Layout'
import Card from './components/card/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../config'

const Home = () => {
  const [blogs,setBlogs] = useState([])
  const fetchBlogs = async ()=>{
    const response = await axios.get(`${baseUrl}/blog`)
      if(response.status === 200){
    setBlogs(response.data.data)
    }
  }
  useEffect(()=>{
    fetchBlogs()
  },[])

  return (
      <Layout>
        <div className='flex flex-wrap justify-center space-x-5 mt-6'>
          {
            blogs.length > 0 && blogs.map((blog)=>{
              return(
                // <Card key={blog._id} blog={blog} />
                <Card blog={blog} />
              )
            })
          }

         </div>
      </Layout>
  )
}

export default Home