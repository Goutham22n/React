import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Git_hubU() {

    const [users,setUsers]=useState([])
    

    useEffect(()=>{
    axios.get('https://api.github.com/users')
    .then((response)=>setUsers(response.data))
    },[])


  return (
    <>
    <h2 className='text-center mt-3'>Git_hub Users</h2>
    <div className='container p-5 mt-5' style={{background:'green',border:'none',boxShadow : "0 2px 5px rgba(0,0,0,0.1)",borderRadius:"8px"}} >
        <div  style={{display:'flex',flexGrow:1,flexWrap:'wrap',gap:"50px"}}>
            {
                users.map((user)=>(
                    <div style={{display:"flex",border:"1px solid grey",width:"300px",borderRadius:"10px",boxShadow: "0 2px 5px rgba(0,0,0,0.1)"}}>
                        <img src={user.avatar_url} alt='image'style={{borderRadius:'50%'}} width="100"></img>
                        <p className='mt-4'><b>{user.login}</b></p>
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer"style={{marginTop:"70px",marginLeft:"0px",textDecoration:"none",color:"black"}}>
                                    View Profile
                            </a>
                        
                    </div>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default Git_hubU