import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FeaturedFoods = () => {
    const [availableFoods, setAvailableFoods] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('https://food-unity-exchange-server.vercel.app/featuredFoods')
            .then(res => setAvailableFoods(res.data))
    }, [])
    return (
        <div className='w-full flex flex-col justify-center items-center my-10'>
            <h1 className='text-5xl font-bold text-primary text-center'>Featured Foods</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    availableFoods ? availableFoods.map((food) => {
                        return (
                            <div key={food._id} className='flex justify-center items-center p-4 bg-base-200'>
                                <div className='flex flex-col justify-around items-start gap-2'>
                                    <img src={food.foodImage} className='w-[300px] h-[220px]' alt="" />
                                    <h1 className='text-2xl font-semibold'>
                                        {food.foodName}</h1>
                                    <div className='flex justify-start items-center gap-6'>
                                        <img src={food.donorImage} className='h-[30px] w-[30px] rounded-full' alt="" />
                                        <h1 className='text-xl font-semibold'>donor: {food.donorName}</h1>

                                    </div>
                                    <p className='w-[300px] h-[48px]'>{food.pickupLocation}</p>
                                    <div className='flex justify-start items-center gap-2'>

                                        <h1 className='text-lg '>Quantity: {food.foodQuantity}</h1>
                                        <h1 className='text-lg '>Expire Date: {food.expireDate}</h1>

                                    </div>
                                    <p className='w-[300px] h-[48px] overflow-hidden'>{food.additionalNote}</p>
                                    <button className='btn btn-primary' onClick={() => { navigate(`/food-detail/${food._id}`) }}>View Details</button>

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