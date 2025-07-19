import React from 'react'

const Logo = () => {
  return (
     <h1 
              onClick={() => navigate('/')} 
              className='text-primary text-3xl font-bold cursor-pointer'
              
            >
                PortHealth Tele
            </h1>
  )
}

export default Logo