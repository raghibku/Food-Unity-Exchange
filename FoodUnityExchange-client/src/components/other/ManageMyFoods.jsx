import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from "react-helmet";
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageMyFoods = () => {
  const [foods, setFoods] = useState(null);
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  //const url = `https://food-unity-exchange-server.vercel.app/yourDonatedFood?email=${user.email}`

  const url =`/yourDonatedFood?email=${user.email}`
  useEffect(() => {
    // if (user) {
      // axios.get(`https://food-unity-exchange-server.vercel.app/yourDonatedFood?email=${user.email}`)
      axiosSecure.get(url)
        .then(res => setFoods(res.data))
    // }
  }, [loading,url,axiosSecure])

  const handleDelete = id => {
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
      fetch(`https://food-unity-exchange-server.vercel.app/availableFood/${id}`, {
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
      <Helmet>
        <title>Food Unity Exchange | Manage Food</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <h1 className='text-5xl font-bold text-primary text-center my-8'>Manage Food</h1>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>

                Update

              </th>
              <th>

                Delete

              </th>
              <th>

                Manage

              </th>

            </tr>
          </thead>
          <tbody>
            {
              foods ?
                foods.map(food => {
                  return (
                    <tr>
                      <td>
                        <h1 className='text-2xl font-bold'>{food.foodName}</h1>
                      </td>
                      <th>
                        <button className='btn btn-primary' onClick={() => navigate(`/update-food/${food._id}`)}>
                          Update
                        </button>
                      </th>
                      <th>
                        <button onClick={()=>{handleDelete(food._id)}} className='btn btn-secondary'>
                          Delete
                        </button>
                      </th>
                      <th>
                        <button className='btn btn-accent' onClick={() => navigate(`/manage-food/${food._id}`)}>
                          Manage
                        </button>
                      </th>

                    </tr>
                  )
                }) : <tr><td><span className="loading loading-spinner text-primary"></span></td></tr>
            }
          </tbody>

        </table>
      </div>
      <ToastContainer />
    </div>

  )
}

export default ManageMyFoods