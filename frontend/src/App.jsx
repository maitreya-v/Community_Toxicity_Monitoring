import React from 'react'
import { BrowserRouter } from "react-router-dom"

import { About,Contact,Experience,Feedbacks,Hero,Navbar,Tech,Works,StarsCanvas} from "./components"

const App = () => {
  return (
    <BrowserRouter>
    {/* <div className="relative z-0 bg-[#EEE2DC]"> */}
    <div className="relative z-0 bg-gradient-to-b from-[#180A0A] to-[#000000]">
    <div className=' bg-cover bg-no-repeat bg-center'>
    {/* <Navbar /> */}
     <Hero />
     {/* <Contact /> */}
     {/* <StarsCanvas /> */}
    </div>

    {/* <About />
    <Works /> */}

    {/* <Experience /> */}
    
    <div className='relative z-0 '>
    
     
    </div>

    </div>
    </BrowserRouter>
  )
}

export default App
