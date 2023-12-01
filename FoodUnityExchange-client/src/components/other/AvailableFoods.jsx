import axios from 'axios'
import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function sortObjectsByDate(objects) {
  return objects.sort((a, b) => {
    const dateA = new Date(a.expireDate);
    const dateB = new Date(b.expireDate);
    return dateA - dateB;
  });
}

const AvailableFoods = () => {

  const [availableFoods, setAvailableFoods] = useState(null);
  const [isSorted, setisSorted] = useState(false);
  const [displayAvailableFoods, setdisplayAvailableFoods] = useState(null);
  const [searchVal, setSearchVal] = useState(null);
  const [count, setcount] = useState(0)

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://food-unity-exchange-server.vercel.app/availableFood')
      .then(res => setAvailableFoods(res.data))
  }, [])

  useEffect(()=>{
    console.log(count)
    if(availableFoods){
      if(!isSorted){
      setdisplayAvailableFoods(availableFoods)
    }
    else{
      const newArr = [...availableFoods]
      console.log(newArr)
      const sortedObjects = sortObjectsByDate(newArr);
      setdisplayAvailableFoods(sortedObjects);
    }
  }
  },[availableFoods,isSorted ,count])

  const handleSortByExpireDate = () => {
    setisSorted(true)
  }
  useEffect(()=>{
    if(searchVal){
      const newArr = displayAvailableFoods.filter(food => food.foodName.toLowerCase().includes(searchVal.toLowerCase()));
      setdisplayAvailableFoods(newArr);
    }else{
      setcount(count+1)
    }
  },[searchVal])

  return (
    <div className='flex flex-col justify-center items-center'>
      <Helmet>
        <title>Food Unity Exchange | Available Foods</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <h1 className='text-5xl font-bold text-primary text-center my-8'>Available Foods</h1>
      <div className='w-full flex justify-center items-center gap-4'>
        <button onClick={handleSortByExpireDate} className='btn btn-primary'>Sort By Expire Date</button>
        <form>
          <input className='border-2 h-[48px] w-[400px] text-2xl px-4 rounded-md border-black' placeholder='search' type="search" value={searchVal} name="" onChange={e=>{setSearchVal(e.target.value)}} id="" />
          
        </form>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          displayAvailableFoods ? displayAvailableFoods.map((food) => {
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
                  <button className='btn btn-primary' onClick={()=>{navigate(`/food-detail/${food._id}`)}}>View Details</button>

                </div>
              </div>
            )
          }) : <span className="loading loading-spinner text-primary"></span>
        }

      </div>
    </div>
  )
}

export default AvailableFoods