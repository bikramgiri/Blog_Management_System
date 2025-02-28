// import React from 'react'
import { useEffect, useState } from "react"
import PropTypes from "prop-types"

const Form = ({type,onSubmit,initialData}) => {
	const [data,setData] = useState({
		title: "",
		subtitle: "",
		category: "",
		description: "",
		image: "null"
	})

       
	 // Populate form fields when initialData is available
	 useEffect(() => {
		if (initialData && Object.keys(initialData).length > 0) {
		  setData((prevData) =>({
			...prevData,
		    title: initialData.title || "",
		    subtitle: initialData.subtitle || "",
		    category: initialData.category || "",
		    description: initialData.description || "",
		    image: initialData.imageUrl || null,
		  }))
		}
	    }, [initialData])

      
      // Handle input changes
  const handleChange = (e) => {
	const { name, value, type } = e.target
	if (type === "file") {
	  setData((prevData) => ({ ...prevData, image: e.target.files[0] }))
	} else {
	  setData((prevData) => ({ ...prevData, [name]: value }))
	}
    }

	// const handleChange = (e) => {
	// 	const {name,value} = e.target
	// 	setData({
	// 		...data,
	// 		[name]: name === "image" ? e.target.files[0] : value
	// 	})
	// }

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(data)
	}
  return (
      <div className="flex justify-center w-screen h-screen">
	
      <div className="container my-3 px-4 lg:px-20">

		<div className="w-full p-8 my-2 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl mx-25">
			<div className="flex">
				<h1 className="font-bold uppercase text-5xl">{type} Blog</h1>
			</div>
			<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Title*" name="title" value={data.title} onChange={handleChange} required  />
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Subtitle*" name="subtitle" value={data.subtitle} onChange={handleChange} required />
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="file" name="image" onChange={handleChange} />
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Category*" name="category" value={data.category} onChange={handleChange} required />
                  </div>
				<div className="my-4">
					<textarea required placeholder="Description*" name="description" value={data.description} onChange={handleChange} className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
				</div>
				<div className="my-2 w-1/2 lg:w-1/4">
					<button type="submit" className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">Submit</button>
				</div>
			</form>
		</div>

		
    </div>

</div>
  )
}

Form.propTypes = {
	type: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
	initialData: PropTypes.object,
    }

export default Form