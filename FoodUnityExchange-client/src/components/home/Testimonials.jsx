import React from 'react'

const Testimonials = () => {
    return (
        <div name="testimonials" className='flex flex-col justify-center items-center my-8 min-h-screen'>
            <h1 className='text-5xl font-bold text-primary text-center'>Customer Reviews</h1>
            <h2 className='text-2xl font-bold  text-center py-6'>What our Customers are saying</h2>
            <div className='flex justify-center items-center'>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                    <div className='flex flex-col justify-center items-center gap-2 bg-base-300 text-black hover:scale-110 transform transition duration-500 rounded-lg w-[250px] m-4 p-5 shadow-[0_35px_60px_-15px_rgba(58,191,248,0.3)]'>
                        <div className='w-full flex justify-start items-start'>
                            <img src=" /logos/icons8-quote-left-64.png" className='h-20' alt="" />
                        </div>

                        <p className='h-[120px]'> Food Unity Exchange is a game-changer! Connecting us to delicious, home-cooked meals and wonderful neighbors. It's a blessing!</p>
                        

                        <img src=" /logos/icons8-person-94.png" className='h-14' alt="" />
                        <p>-Sanaullah Ashfat</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 bg-base-300 text-black hover:scale-110 transform transition duration-500 rounded-lg w-[250px] m-4 p-5 shadow-[0_35px_60px_-15px_rgba(242,80,163,0.3)]'>
                        <div className='w-full flex justify-start items-start'>
                            <img src=" /logos/icons8-quote-left-64.png" className='h-20' alt="" />
                        </div>

                        <p className='h-[120px]'>Thanks to Food Unity Exchange, I've discovered amazing local dishes and met incredible people. It's the heart of our community.</p>
                        
                        <img src=" /logos/icons8-person-94.png" className='h-14' alt="" />
                        <p>-Noyon Sarkar</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 bg-base-300 text-black hover:scale-110 transform transition duration-500 rounded-lg w-[250px] m-4 p-5 shadow-[0_35px_60px_-15px_rgba(58,191,248,0.3)]'>
                        <div className='w-full flex justify-start items-start'>
                            <img src=" /logos/icons8-quote-left-64.png" className='h-20' alt="" />
                        </div>

                        <p className='h-[120px]'>Food Unity Exchange brings people closer through food. It's where generosity and culinary magic unite, making every meal memorable.</p>
                        
                        <img src=" /logos/icons8-person-94.png" className='h-14' alt="" />
                        <p>-Alamin Hossain</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials