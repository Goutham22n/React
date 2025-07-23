import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Reg() {

    const [register,setRegister]= useState({})
    const [passwordError, setPasswordError] = useState('')
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate()

    const handleInput=(e)=>{
        const {name,value}= e.target

        setRegister({
            ...register,
            [name]:value
        })
        if(name==='Password'){
            validatePassword(value);
        }
    }

    const validatePassword=(password)=>{
        const lengthCheck = password.length >= 8;
        const lowercaseCheck = /[a-z]/.test(password);
        const uppercaseCheck = /[A-Z]/.test(password);
        const numberCheck = /[0-9]/.test(password);
        const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!lengthCheck) {
            setPasswordError('Password must be at least 8 characters.');
        } else if (!lowercaseCheck) {
            setPasswordError('Password must contain at least one lowercase letter.');
        } else if (!uppercaseCheck) {
            setPasswordError('Password must contain at least one uppercase letter.');
        } else if (!numberCheck) {
            setPasswordError('Password must contain at least one number.');
        } else if (!specialCharCheck) {
            setPasswordError('Password must contain at least one special character.');
        } else {
            setPasswordError(''); 
        }
    }


    const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
    };



    const handleSubmit= async (e)=>{
        e.preventDefault()
        if (passwordError) {
            alert('Please fix password requirements before submitting.');
        }else{
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/register/',register,{
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
    }



  return (
    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>    
        <div className='container mt-5 shadow p-4' style={{width:"500px"}}>
            <h2>Register Here</h2>
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="name" class="form-label">Username</label>
                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" name='Name' onChange={handleInput}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email' onChange={handleInput}/>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <div style={{ position: 'relative' }}>
        <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name="Password" onChange={handleInput}/>
        <button type="button" onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px',top: '50%',transform: 'translateY(-50%)',background: 'none',border: 'none',cursor: 'pointer',fontSize: '18px'}}>
            {showPassword ? '🙈' : '👁️'}
        </button>
    </div>
    {passwordError && <div style={{ color: 'red', marginTop: '5px' }}>{passwordError}</div>}
</div>

            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <p className='m-3'>Already have an account ? <Link to="/" >Login</Link></p>
        </div>
    </div>
  )
}

export default Reg