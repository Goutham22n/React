import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Fake() {

    const [fakeDetails,setFakeDetails] = useState([])
    const [details,setDetails]= useState({})

    useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then((response) => (response.json()))
      .then(json => {
        setFakeDetails(json)
        console.log(json)})
    },[])

    const handleDetails = (id)=>{
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response)=>setDetails(response.data))
    }


  return (
    <>
    <div className='container m-5 p-5'>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope='col'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                fakeDetails.map((item)=>
                <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.address.street}</td>
                    <td>{item.phone}</td>
                    <td>
                        <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleDetails(item.id)}>View</button>&nbsp;
                        <button className='btn btn-danger'>Update</button>&nbsp;
                        <button className='btn btn-warning'>Delete</button>&nbsp;

                    </td>
                </tr>
                )
            }
        </tbody>
        </table>
    </div>

    <div class="modal" tabindex="-1" id="exampleModal" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>{details.name}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Fake