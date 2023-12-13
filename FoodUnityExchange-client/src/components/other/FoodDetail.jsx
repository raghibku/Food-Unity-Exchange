import React, { useContext } from 'react'
import { Helmet } from "react-helmet";
import { AuthContext } from '../../provider/AuthProvider'
import { useLoaderData } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodDetail = () => {
    const { user, loading } = useContext(AuthContext);
    const food = useLoaderData();
    const date = new Date();
    const buttonStyle = user ? "btn btn-primary" : 'hidden';
    const handleRequest = event => {
        event.preventDefault();

        const form = event.target;
        const foodName = form.name.value;
        const foodImage = form.photo.value;
        const foodId = form.id.value;

        const donorName = form.donorName.value;
        const donorEmail = form.donorEmail.value;

        const requesterEmail = form.userEmail.value;

        const requestDate = form.requestDate.value;
        const requestTime = form.requestTime.value;
        const location = form.location.value;
        const expireDate = form.expireDate.value;

        const note = form.note.value;
        const amount = form.amount.value;

        const foodReq = {
            foodName,
            foodImage,
            foodId,
            donorName,
            donorEmail,
            requesterName: user?.displayName,
            requesterEmail,
            requesterImage: user?.photoURL,
            requestDate,
            requestTime,
            location,
            expireDate,
            note,
            amount,
            status: 'pending',
        }
        console.log(foodReq)

        fetch('https://food-unity-exchange-server.vercel.app/requestedFood', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(foodReq)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast.success('Request successfull', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                }
            })
    }
    return (
        <div key={food._id} className='flex flex-col justify-center items-center p-4 bg-base-200'>
            <Helmet>
                <title>Food Unity Exchange | Food Detail</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center my-8'>Food Detail</h1>
            <div className='flex flex-col justify-around items-start gap-2'>
                <img src={food.foodImage} className='w-2/3 md:w-[600px] ' alt="" />
                <h1 className='text-2xl font-semibold'>
                    {food.foodName}</h1>

                <p className='w-2/3 md:w-[600px]'>{food.pickupLocation}</p>
                <div className='flex justify-start items-center gap-2'>

                    <h1 className='text-lg '>Quantity: {food.foodQuantity}</h1>
                    <h1 className='text-lg '>Expire Date: {food.expireDate}</h1>

                </div>
                <div className='flex justify-around items-center w-full'>
                    <button className={buttonStyle} onClick={() => document.getElementById('my_modal_5').showModal()}>Request Food</button>

                    <FacebookShareButton
                        url={`https://foodunityexchange.web.app/food-detail/${food._id}`}
                        quote={'This is surplus food! If anyone need it let me know'}
                        hashtag="#FUE"
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </div>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">

                    <div className="modal-box">
                        <form onSubmit={handleRequest} className="flex flex-col gap-2 text-xl">
                            {/* food */}

                            Food Name:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={food.foodName} placeholder="Food Name" name="name" />

                            Food Photo:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="url" value={food.foodImage} placeholder="Food Photo" name="photo" />

                            Food id:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={food._id} placeholder="Food id" name="id" />

                            {/* donor */}

                            Donor Name:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={food.donorName} placeholder="Donor Name" name="donorName" />

                            Donor Email:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="email" value={food.donorEmail} placeholder="Donor Email" name="donorEmail" />
                            {/* req */}
                            Your Email: <input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="email" value={user?.email} placeholder="Your Email" name="userEmail" />
                            {/*req date ,location,expire-date */}
                            Request Date:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={date.toISOString().slice(0, 10)} placeholder="Request Date" name="requestDate" />
                            Request Time:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={date.toISOString().slice(11, 19)} placeholder="Request Time" name="requestTime" />

                            Pickup Location:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={food.pickupLocation} placeholder="Pickup Location" name="location" />
                            Expire Date:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="date" value={food.expireDate} placeholder="Expire Date" name="expireDate" />
                            {/* additional note , donation amount  */}
                            Additional Note:<input className="my-2 border p-2 rounded-lg text-gray-600" type="text" placeholder="Additional Note" name="note" />
                            Donation Amount:<input className="my-2 border p-2 rounded-lg text-gray-600" type="text" placeholder="Donation Amount" name="amount" />

                            <button className="btn btn-primary" type="submit">Request</button>
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </form>
                    </div>
                </dialog>

            </div>
            <ToastContainer />
        </div>
    )
}

export default FoodDetail