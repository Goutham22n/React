import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const [data,setFormData] = useState({})
    const navigate = useNavigate()

    function handleInput(e){
        const {name,value}= e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/login/`,data,{
                headers :{
                    'Content-Type': 'application/json'
                }
            })
        
        if(response.status === 200 || response.status ===201){
            toast.success(`Login Succesfull ${data.name}`,{
                position : 'top-center',
                theme:'colored'
            })
            navigate('/profile/')
        }
        
        else{
            toast.error(`Login not Succesful ${data.name}`,{
                position : 'top-center',
                theme:'colored'
            })
        }}
        catch(error){
            console.log('Error occured',error)
            toast.error('Invalid credentials or server error', {
                position: 'top-center',
                theme: 'colored'
            });
        }
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className='container p-4 mb-3 mt-5' style={{width:"500px",boxShadow: "2px 5px 8px 0px black",borderRadius:"5px"}}>
            <h2>Login</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="Name" onChange={handleInput}/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="Password" onChange={handleInput}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <p>Dont have a Account?..<Link to='reg/'>Register Here</Link></p>
        </div>
    </form>
    </>
  )
}

export default Login