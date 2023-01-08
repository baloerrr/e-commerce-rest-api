import React from 'react';


const Navbar = () => {
  return (
    <div className='h-[60px] bg-green-500'>
        <div className='py-[10px] px-[20px] flex flex-row items-center justify-between  text-white'>
            <div>
                <h1>Left</h1>
            </div>
            <div>
                <h1>Center</h1>
            </div>
            <div>
                <h1>Right</h1>
            </div>
        </div>
    </div>
  )
}

export default Navbar