import React from 'react'
import { expertisedata } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-black'>
            <h1 className='text-3xl font-medium'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted experts, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
                {expertisedata.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.expert}`} 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 text-black' 
                        key={index}
                    >
                        <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt={item.expert} />
                        <p className='text-black font-medium'>{item.expert}</p>  {/* FIXED: item.speciality -> item.expert */}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
