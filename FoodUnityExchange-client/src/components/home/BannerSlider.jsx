import React from 'react'
import { useNavigate } from 'react-router-dom'
//import 'animate.css';
const BannerSlider = () => {
    const navigate = useNavigate();
    // const divStyle = {
    //     backgroundImage: 'linear-gradient(rgba(58, 191, 248, 0.5), rgba(58, 191, 248, 0.75)), url(https://source.unsplash.com/an-abstract-purple-and-blue-background-with-wavy-lines-beCUr7D24Vs)',
    //     backgroundSize: 'cover',
    // };
    return (
        <div className="carousel w-full h-[600px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://source.unsplash.com/wth-glasses-with-milk-family-kids-in-white-chef-uniform-preparing-food-on-the-kitchen-Fa3NuaaGRBY" className="w-full " />
                <div className="absolute  flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-full'>
                        <h1 className='text-transparent bg-clip-text  text-3xl bg-gradient-to-r from-white via-white to-white lg:text-7xl font-serif	 font-semibold  pt-36'>Welcome to <br /><span className='animate__animated animate__bounceInLeft animate-delay-2s  font-extrabold bg-gradient-to-r from-white to-white text-transparent bg-clip-text '>Food Unity Exchange</span></h1>
                        <h1 className='animate__animated animate__bounceInLeft animate__delay-1s  text-xl  lg:text-3xl font-semibold '>Bridging Communities with Shared Meals</h1>
                        <div>
                            <button className="btn btn-primary mr-5" onClick={()=>{navigate('/available-foods')}}>Available Foods</button>
                            <button className="btn btn-outline btn-secondary" onClick={()=>{navigate('/add-food')}}>Add Food</button>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide4" className="btn bg-accent-focus btn-circle mr-5">❮</a>
                    <a href="#slide2" className="btn bg-accent-focus btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://source.unsplash.com/assorted-food-and-ingredients-IIzny_Qgw-g" className="w-full " />
                <div className="absolute  flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-full'>
                        <h1 className='text-transparent bg-clip-text  text-3xl bg-gradient-to-r from-white via-white to-white lg:text-7xl font-serif	 font-semibold  pt-36'>Welcome to <br /><span className='animate__animated animate__bounceInLeft animate-delay-2s  font-extrabold bg-gradient-to-r from-white to-white text-transparent bg-clip-text '>Food Unity Exchange</span></h1>
                        <h1 className='animate__animated animate__bounceInLeft animate__delay-1s  text-xl  lg:text-3xl font-semibold '>Bridging Communities with Shared Meals</h1>
                        <div>
                            <button className="btn btn-primary mr-5">Available Foods</button>
                            <button className="btn btn-outline btn-secondary">Add Food</button>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide1" className="btn bg-accent-focus btn-circle mr-5">❮</a>
                    <a href="#slide3" className="btn bg-accent-focus btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://source.unsplash.com/cooked-dish-on-gray-bowl--YHSwy6uqvk" className="w-full " />
                <div className="absolute  flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-full'>
                        <h1 className='text-transparent bg-clip-text  text-3xl bg-gradient-to-r from-white via-white to-white lg:text-7xl font-serif	 font-semibold  pt-36'>Welcome to <br /><span className='animate__animated animate__bounceInLeft animate-delay-2s  font-extrabold bg-gradient-to-r from-white to-white text-transparent bg-clip-text '>Food Unity Exchange</span></h1>
                        <h1 className='animate__animated animate__bounceInLeft animate__delay-1s  text-xl  lg:text-3xl font-semibold '>Bridging Communities with Shared Meals</h1>
                        <div>
                            <button className="btn btn-primary mr-5">Available Foods</button>
                            <button className="btn btn-outline btn-secondary">Add Food</button>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide2" className="btn bg-accent-focus btn-circle mr-5">❮</a>
                    <a href="#slide4" className="btn bg-accent-focus btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img src="https://source.unsplash.com/man-in-black-t-shirt-holding-red-plastic-container-Drf9a196d7M" className="w-full " />
                <div className="absolute  flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-full'>
                        <h1 className='text-transparent bg-clip-text  text-3xl bg-gradient-to-r from-white via-white to-white lg:text-7xl font-serif	 font-semibold  pt-36'>Welcome to <br /><span className='animate__animated animate__bounceInLeft animate-delay-2s  font-extrabold bg-gradient-to-r from-white to-white text-transparent bg-clip-text '>Food Unity Exchange</span></h1>
                        <h1 className='animate__animated animate__bounceInLeft animate__delay-1s  text-xl  lg:text-3xl font-semibold '>Bridging Communities with Shared Meals</h1>
                        <div>
                            <button className="btn btn-primary mr-5">Available Foods</button>
                            <button className="btn btn-outline btn-secondary">Add Food</button>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide3" className="btn bg-accent-focus btn-circle mr-5">❮</a>
                    <a href="#slide1" className="btn bg-accent-focus btn-circle">❯</a>
                </div>
            </div>
        </div>
        
    )
}

export default BannerSlider