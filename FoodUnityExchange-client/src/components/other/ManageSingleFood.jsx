import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { useLoaderData } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ManageSingleFood = () => {
    const food = useLoaderData();
    const buttonClasses = (food ) ? 'btn btn-accent' : 'hidden'
    const msgClass = food ? 'hidden' : 'text-lg text-center'
    console.log(food);
    const [status, setStatus] = useState(food.status)
    const handleDeliver = id => {
        //change status in requested foods ('delivered)
        fetch(`https://food-unity-exchange-server.vercel.app/requestedFood/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'delivered' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStatus('delivered');
                toast.success('Delivery successfull', {
                    position: 'top-right',
                    autoClose: 3000, 
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  })
            })
        //change status in all foods ('not available')
        fetch(`https://food-unity-exchange-server.vercel.app/availableFoodStatus/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'not-available' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
    }
    return (
        <div>
            <Helmet>
                <title>Food Unity Exchange | Manage Food Request</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <h1 className='text-5xl font-bold text-primary text-center my-8'>Manage {food.foodName} Request</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Requester Name</th>
                            <th>

                                Requester Image

                            </th>
                            <th>

                                Requester Email

                            </th>
                            <th>

                                Request Date

                            </th>
                            <th>

                                Request Time

                            </th>
                            <th>

                                Delivery Status

                            </th>

                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            <tr>
                                <td>
                                    <h1 className='text-2xl font-bold'>{food?food.requesterName:'no request'}</h1>
                                </td>
                                <td>
                                    <img src={food.requesterImage} className='h-[60px]' alt="" />
                                </td>
                                <td>
                                    <h1 className='text-2xl font-bold'>{food.requesterEmail}</h1>
                                </td>
                                <td>
                                    <h1 className='text-2xl font-bold'>{food.requestDate}</h1>
                                </td>
                                <td>
                                    <h1 className='text-2xl font-bold'>{food.requestTime}</h1>
                                </td>
                                <td>
                                    <h1 className='text-2xl font-bold'>{status}</h1>
                                </td>

                                <th>
                                    <button className={buttonClasses} onClick={() => { handleDeliver(food.foodId) }}>
                                        Deliver
                                    </button>
                                </th>

                            </tr>


                        }
                    </tbody>

                </table>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default ManageSingleFood