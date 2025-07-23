import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Profiles() {

  const [profile,setProfile]= useState([])
  const [details, setDetails] = useState({});

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/get/')
    .then((response)=>{setProfile(response.data)
    }).catch((error)=>
    console.log('error'))
  },[])
 
  const handleDelete=(id)=>{
    axios.delete(`http://127.0.0.1:8000/api/delete/${id}/`)
    .then(()=>toast.success('Deleted succesfully',{
      position:'top-center',
      theme:'colored'
    }))
  }

  const handleDetails=(id)=>{
    axios.get(`http://127.0.0.1:8000/api/fetch/${id}/`)
    .then((response)=>setDetails(response.data))
  }

  return (
    <>
    <div style={{background:"grey"}} className='p-3'>
      <div style={{display:'flex',paddingTop:'10px'}} className='mb-4'>
        <h2 >Team Members</h2>
        <Link to='/create' className='btn btn-primary'  style={{marginLeft:"10px"}}>Create</Link>
        <Link to='/git/' className='btn btn-primary'  style={{marginLeft:"10px"}}>Git hub users</Link>
        <Link to='/reg/' className='btn btn-primary'  style={{marginLeft:"10px"}}>Register</Link>
        <Link to='/fake/' className='btn btn-primary'  style={{marginLeft:"10px"}}>Fake Details</Link>
      </div>
      <div style={{display : 'flex',alignItems:"center",justifyContent:"center",gap:"20px",flexWrap:"wrap"}}>
        {
          profile.map((item)=>(
          <div className="card" style={{width: "18rem"}}>
            <img src={`http://127.0.0.1:8000${item.Profile_pic}`} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Details</h5>
              <ul style={{display:"block"}}>
                <li>Name : <b>{item.Name}</b></li>
                <li>Job : <b>{item.Job}</b></li>
                <li>Company : <b>{item.Company}</b></li>
              </ul>
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleDetails(item.id)}>Go to details</button>
              <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>
            </div>
        </div>
          ))
        }
        
      </div>
    </div>
    <div class="modal" tabindex="-1" id="exampleModal" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ol>
              <li>Name : {details.Name}</li>
              <li>Job : {details.Job}</li>
              <li>Company : {details.Company}</li>
            </ol>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profiles