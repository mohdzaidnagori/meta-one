import React from 'react'


const Range = ({handleChange,value,min,max,step}) => {
  return (
    <div className='range-box'>
      <input
       type="range"
       min={min}
       max={max}
       step={1}
      value={value}
      onChange={handleChange}
        />
      <input type="number" value={value} onChange={handleChange}  />
    </div>
  )
}

export default Range
