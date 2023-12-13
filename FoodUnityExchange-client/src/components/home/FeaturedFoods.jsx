import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaMapLocation } from "react-icons/fa6";

const FeaturedFoods = () => {
    const [availableFoods, setAvailableFoods] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('https://food-unity-exchange-server.vercel.app/featuredFoods')
            .then(res => setAvailableFoods(res.data))
    }, [])
    return (
        <div className='w-full flex flex-col justify-center items-center my-10'>
            <h1 className='text-5xl font-bold text-primary text-center my-10 font-serif'>Featured Foods</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    availableFoods ? availableFoods.map((food) => {
                        return (
                            <div key={food._id} className='flex justify-center items-center p-4 bg-base-200 rounded-lg'>
                                <div className='flex flex-col justify-around items-start gap-2'>
                                    <img src={food.foodImage} className='w-[300px] h-[220px] rounded-md' alt="" />
                                    <h1 className='text-2xl font-semibold font-serif'>
                                        {food.foodName}</h1>
                                    <div className='flex justify-start items-center gap-2 w-full'>
                                        <img src={food.donorImage} className='h-[30px] w-[30px] rounded-full' alt="" />
                                        <h1 className='text-xl font-semibold'>Donor: {food.donorName}</h1>

                                    </div>
                                    <div className='flex justify-start items-center w-[300px] h-[48px] gap-2'>
                                        <div className='text-pink-600 text-2xl'> <FaMapLocation /> </div>
                                        <p > {food.pickupLocation}</p>
                                    </div>
                                    
                                    <div className='flex justify-between items-center w-full'>
                                        <h1 className='text-lg font-semibold'>Quantity: <span className='px-2 py-1  rounded-sm bg-gray-300'>{food.foodQuantity}</span></h1>
                                        <h1 className='text-lg font-semibold'>Exp: <span className='px-2 py-1  rounded-sm bg-gray-300 '>{food.expireDate}</span> </h1>
                                    </div>
                                    <p className='w-[300px] h-[48px] overflow-hidden'>{food.additionalNote}</p>
                                    <button className='btn btn-outline btn-secondary' onClick={() => { navigate(`/food-detail/${food._id}`) }}>View Details</button>

                                </div>
                            </div>
                        )
                    }) : <span className="loading loading-spinner text-primary"></span>
                }

            </div>
            <button className='btn btn-secondary my-8' onClick={()=>{navigate('/available-foods')}}>Show All</button>
        </div>
    )
}

export default FeaturedFoods