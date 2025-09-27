import React from 'react'

const BigCard = ({children, color, players, index}) => {
  return (
    <div className={`${color} w-28 h-28 border-2 border-black items-center justify-around flex flex-col`}>
        {children}
         {
          players.map((e) => e.position===index?<p className='bg-red-700 h-8 w-8 rounded-full text-center flex items-center justify-center'>{e.name.slice(6,8)}</p>:'')
      }
    </div>
  )
}

export default BigCard
