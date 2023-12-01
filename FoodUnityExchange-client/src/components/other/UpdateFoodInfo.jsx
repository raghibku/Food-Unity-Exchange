import React, { useContext } from 'react'
import { Helmet } from "react-helmet";
import { useLoaderData } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateFoodInfo = () => {
    const food = useLoaderData();
    const { user, loading } = useContext(AuthContext);
    console.log(food)

    const handleUpdateFood = event => {
        event.preventDefault();
        const form = event.target;
        const foodName = form.name.value;
        const foodImage = form.photo.value;
        const foodQuantity = form.quantity.value;

        const pickupLocation = form.location.value;
        const expireDate = form.expireDate.value;

        const additionalNote = form.note.value;


        const updatedFood = {
            foodName,
            foodImage,
            foodQuantity,
            
            pickupLocation,
            expireDate,
            additionalNote,
            
        }
        console.log(updatedFood)
        fetch(`https://food-unity-exchange-server.vercel.app/availableFood/${food._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedFood)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.modifiedCount > 0) {

                toast.success('Modified Data successfully', {
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
        <div className='flex justify-center items-center p-4 bg-base-200'>
            <Helmet>
                <title>Food Unity Exchange | Update Food Information</title>
                <meta name="description" content="Helmet application" />
            </Helmet>

            <form onSubmit={handleUpdateFood} className="flex flex-col gap-2 text-xl w-full md:w-2/3">
                {/* food */}

                Food Name:<input className="my-2 border p-2 rounded-lg text-gray-600" type="text" defaultValue={food.foodName} placeholder="Food Name" name="name" />

                Food Photo:<input className="my-2 border p-2 rounded-lg text-gray-600" type="url" defaultValue={food.foodImage} placeholder="Food Photo" name="photo" />

                Food Quantity:<input className="my-2 border p-2 rounded-lg text-gray-600" type="number" defaultValue={food.foodQuantity} placeholder="Food Quantity" name="quantity" />

                {/* donor */}

                {/* Your Name:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={user?.displayName} placeholder="Donor Name" name="donorName"/>

          Your Email:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="email" value={user?.email} placeholder="Donor Email" name="donorEmail"/>

          Your Image: <input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="url" value={user?.photoURL} placeholder="Donor Image" name="donorImage" /> */}

                {/*req date ,location,expire-date */}

                Pickup Location:<input className="my-2 border p-2 rounded-lg text-gray-600" type="text" defaultValue={food.pickupLocation} placeholder="Pickup Location" name="location" />
                Expire Date:<input className="my-2 border p-2 rounded-lg text-gray-600" type="text" defaultValue={food.expireDate} placeholder="YYYY-MM-DD" name="expireDate" />
                {/* additional note , donation amount  */}
                Additional Note:<input className="my-2 border p-2 rounded-lg text-gray-600" type="text" defaultValue={food.additionalNote} placeholder="Additional Note" name="note" />
                {/* Status:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={"available"}  name="status" /> */}

                <button className="btn btn-primary" type="submit">Update Food</button>

            </form>
            <ToastContainer />
        </div>
    )
}

export default UpdateFoodInfo