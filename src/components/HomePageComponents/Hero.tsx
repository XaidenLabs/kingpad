import React from 'react'
import heroImgae from "../assets/gr2.png"
import Image from 'next/image'
import Marquee from 'react-fast-marquee';



const Hero = () => {

    return (
        <div className=''>

            <div className="flex HeroParenTHold flex-wrap md:flex-nowrap justify-evenly items-center">

                <div className="heroChildOneHold flex-col flex justify-center items-center">

                    <div className="heroChild1">

                        <div className="heroInnerChild1 flex flex-col gap-4 text-white">
                            <div>
                                <p className='text-6xl interFont font-normal'>
                                    Fast and Secure <br />
                                    Cryptocurrency <br />
                                    Exchange
                                </p>
                            </div>

                            <p className=' font-semibold'>Trade cryptocurrencies with ease, security, and advanced <br />
                                features on our cutting-edge platform.
                                <br />
                            </p>

                            <button className='flex HeroChildOneHoldExplore justify-center items-center mt-8 w-36 h-10 rounded bg-black text-black font-semibold transition-all ease-in-out duration-500 hover:bg-[#19E09E] hover:border hover:text-black border-black' onClick={() => window.scrollTo({
                                behavior: "smooth",
                                top: 1100
                            })}>Explore More</button>
                        </div>


                    </div>


                </div>


                <div className="heroChildHold2 flex justify-center items-center">

                    <div className="heroCarouselHold flex items-center">
                        <img src='mobile-hand-card.png' className='w-full h-full'/>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Hero

