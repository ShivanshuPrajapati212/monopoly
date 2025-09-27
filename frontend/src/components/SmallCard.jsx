import React from 'react'

import house from '../assets/house.svg'

const SmallCard = ({children, className, color, colorFace, cost, players, index, ownership}) => {

  return (
    <div className={`bg-gray-600 h-28 w-20 relative ${className} flex flex-col items-center justify-start shadow-[inset_0_0_0_1px_rgba(0,0,0,1)]`}>
      <div>
        <div className=''>{children}</div>
      <div className='text-sm text-medium'>{Array.isArray(cost)?'$'+cost[0]:''}</div>
      </div>
      <div className={`${color} absolute ${colorFace}`}></div>
      {
          players.map((e) => e.position===index?<p className='bg-red-700 h-8 w-8 rounded-full text-center flex items-center justify-center'>{e.name.slice(6,8)}</p>:'')
          
      }
      <div className='flex flex-wrap items-center justify-center gap-1'>{Array.isArray(ownership) && ownership[0] &&
        Array.from({ length: ownership[1] }).map((_, idx) => (
          <img key={idx} src={house} className='h-4 w-4' alt="house" />
        ))
      }</div>
      
      
      </div>
  )
}

export default SmallCard
