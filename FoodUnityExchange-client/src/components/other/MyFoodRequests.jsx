import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import RequestedFoodRow from './RequestedFoodRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyFoodRequests = () => {
  const [foods, setFoods] = useState(null);
  const { user, loading } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure();
  // const url = `https://food-unity-exchange-server.vercel.app/requestedFood?email=${user.email}`
  const url = `/requestedFood?email=${user.email}`
  useEffect(() => {
    // if (user) {
      axiosSecure.get(url)
        .then(res => setFoods(res.data))
    // }
  }, [user, loading])

  const handleCancelRequest = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
      fetch(`https://food-unity-exchange-server.vercel.app/requestedFood/${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.success('Deleted successfully', {
              position: 'top-right',
              autoClose: 3000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
            const remaining = foods.filter(food => food._id !== id);
            setFoods(remaining);
          }//IF
        })//THEN1
  }})
  
  }

  return (
    <div>
      <div>
        <Helmet>
          <title>Food Unity Exchange | My Food Request</title>
          <meta name="description" content="Helmet application" />
        </Helmet>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center my-8'>My Food Requests</h1>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Donor Name</th>
                <th>Pickup Location</th>
                <th>Expiration Date</th>
                <th>Request Date</th>
                <th>Your Donation</th>
                <th>Delivery Status</th>
                <th>Cancel Request</th>
              </tr>
            </thead>
            <tbody>
              {
                foods ?
                  foods.map(food => <RequestedFoodRow
                    key={food._id}
                    food={food}
                    handleCancelRequest={handleCancelRequest}
                  ></RequestedFoodRow>) : <tr><td><span className="loading loading-spinner text-primary"></span></td></tr>
              }
            </tbody>

          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default MyFoodRequests