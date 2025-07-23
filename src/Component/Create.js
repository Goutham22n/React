import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Create() {


    const [data,setData]=useState({})
    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {name,value} = e.target
        setData({
            ...data,
            [name]:value,
        })
    }
    const handleImage = (e)=>{
        const file = e.target.files[0]
        setData(prev => ({
            ...prev,
            Profile_pic : file
        }))
    }


    const handleSubmit= async (e)=>{
        e.preventDefault()

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/create/',data,{
                headers:{
                    "Content-Type":'multipart/form-data'
                }
            })
            if (response.status ===200 || response.status ===201){
                toast.success("Data inserted succesfully",{
                    position:'top-center',
                    theme: "colored"
                })
            }
            navigate('/')
            }catch(error){
                toast.error('Something went wrong',{
                    position:'top-center',
                    theme:'colored'
                })
        }
    }


  return (
    <>
    <div className='container  p-5 shadow mt-5' style={{width:'500px', marginLeft:'450px'}}>
        <form onSubmit={handleSubmit}>
            <h2 className='mb-4 mt-0'>Register</h2>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} name='Name'/>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail2" className="form-label">Job</label>
                <input type="text" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" onChange={handleChange} name='Job'/>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail3" className="form-label">Company</label>
                <input type="text" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" onChange={handleChange} name='Company'/>
            </div>
            <div className="mb-3">
                <label for="image" className="form-label">Image</label>
                <input type="file" accept='image/*' className="form-control" id="image" onChange={handleImage} name='Profile_pic'/>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    </>
  )
}

export default Create