import React, { useContext } from 'react'
import { Helmet } from "react-helmet";
import { AuthContext } from '../../provider/AuthProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddFood = () => {
  const { user, loading } = useContext(AuthContext);

  const handleAddFood = event => {
    event.preventDefault();

    const form = event.target;
    const foodName = form.name.value;
    const foodImage = form.photo.value;
    const foodQuantity = form.quantity.value;

    const pickupLocation = form.location.value;
    const expireDate = form.expireDate.value;

    const additionalNote = form.note.value;


    const newFood = {
      foodName,
      foodImage,
      foodQuantity,
      donorName: user?.displayName,
      donorEmail: user?.email,
      donorImage: user?.photoURL,
      pickupLocation,
      expireDate,
      additionalNote,
      foodStatus: 'available',
    }
    console.log(newFood)

    fetch('https://food-unity-exchange-server.vercel.app/availableFood', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFood)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          
          toast.success('Added Food successfully', {
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
    <div className='flex flex-col justify-center items-center p-4 bg-base-200'>
      <Helmet>
        <title>Food Unity Exchange | Add Food</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center my-8'>Add Food</h1>
        <form onSubmit={handleAddFood} className="flex flex-col gap-2 text-xl w-full md:w-2/3">
          {/* food */}

          Food Name:<input className="my-2 border p-2 rounded-lg text-gray-600" type="text" placeholder="Food Name" name="name" />

          Food Photo:<input className="my-2 border p-2 rounded-lg text-gray-600" type="url" placeholder="Food Photo" name="photo" />

          Food Quantity:<input className="my-2 border p-2 rounded-lg text-gray-600" type="number" placeholder="Food Quantity" name="quantity" />

          {/* donor */}

          {/* Your Name:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={user?.displayName} placeholder="Donor Name" name="donorName"/>

          Your Email:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="email" value={user?.email} placeholder="Donor Email" name="donorEmail"/>

          Your Image: <input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="url" value={user?.photoURL} placeholder="Donor Image" name="donorImage" /> */}

          {/*req date ,location,expire-date */}

          Pickup Location:<input className="my-2 border p-2 rounded-lg text-gray-600"  type="text"  placeholder="Pickup Location" name="location" />
          Expire Date:<input className="my-2 border p-2 rounded-lg text-gray-600"  type="text"  placeholder="YYYY-MM-DD" name="expireDate" />
          {/* additional note , donation amount  */}
          Additional Note:<input className="my-2 border p-2 rounded-lg text-gray-600" type="text" placeholder="Additional Note" name="note" />
          {/* Status:<input className="my-2 border p-2 rounded-lg text-gray-600" readOnly={true} type="text" value={"available"}  name="status" /> */}

          <button className="btn btn-primary" type="submit">Add Food</button>
          
        </form>
        <ToastContainer />
    </div>

  )
}


export default AddFood