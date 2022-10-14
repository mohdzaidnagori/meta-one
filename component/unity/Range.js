import React from 'react'


const Range = ({handleChange,value}) => {
  return (
    <div className='range-box'>
      <input
       type="range"
       min='0'
       max='35'
       step='0.1'
      value={value}
      onChange={handleChange}
        />
      <input type="number" value={value} onChange={handleChange}  />
    </div>
  )
}

export default Range
