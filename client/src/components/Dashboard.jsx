import React from 'react'
import Slide1 from './Slide1'
import Slide2 from './Slide2'

const Dashboard = () => {
  return (
    <div className="w-full flex">
      <div className="lg:w-3/4 w-full ">
          <Slide1 />
      </div>
      <div className="hidden lg:block w-1/4 ">
          <Slide2 />
      </div>
    </div>
  )
}

export default Dashboard