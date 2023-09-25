import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { motion } from "framer-motion"
import { styles } from "../styles"
import { ComputersCanvas } from "./canvas"
import MoonLoader from "react-spinners/MoonLoader";
const Hero = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [toxicStatus, setToxicStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleImageInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      const formData = new FormData();
      formData.append("file", file);

      setIsLoading(true);

      try {
        const response = await fetch('https://29cf-2405-201-1b-6066-c93d-7a6f-4644-a7cb.ngrok.io/upload', {
          method: 'POST',
          body: formData,
        });

        
        if (response.ok) {
          const result = await response.json();
          if (result.response === 'Toxic') {
            setToxicStatus('toxic');
            setSelectedImage(null)
          } else if (result.response === 'Not Toxic') {
            setToxicStatus('non-toxic');
            setSelectedImage(null)
          } else {
            console.error('Invalid response from the server.');
            setSelectedImage(null)
          }
        } else {
          console.error('Image upload failed.');
        }
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full h-screen mx-auto">
      {/* main */}
      <div className={`sm:px-16 px-16 flex items-center justify-center absolute bottom-[290px] inset-0 max-w-7xl mx-auto flex flex-row items-start gap-7`} style={{ zIndex: 2 }}>
        {/* Your main content */}
        <div className="flex flex-col justify-center items-center mt-5">
          {/* // line 
          theres a glitch that makes the line turn black. just enter bg-[ff000] similarly for green and then crt z */}
          {/* <div className={`w-7 h-7 rounded-full bg-[#${toxicStatus === 'toxic' ? 'FF0000' : '95FF66'}]`} />
          <div className={`w-2 rounded-b-md sm:h-80 h-80 bg-gradient-to-t from-[#444444] to-[#${toxicStatus === 'toxic' ? 'FF0000' : '95FF66'}]`} /> */}
          {/* <div className={`w-7 h-7 rounded-full bg-[#EEE2DC]`} />
          <div className={`w-2 rounded-b-md sm:h-80 h-80 bg-gradient-to-b from-[#EEE2DC] to-[#222222]`} /> */}
        </div>

        <div>
          <h1 className={`font-black lg:text-[70px] sm:text-[50px] xs:text-[50px] text-[40px] lg:leading-[98px] text-center text-[#EEE2DC]`}>Chat <span className=" bg-gradient-to-tl from-[#95FF66] to-[red] bg-clip-text text-transparent ">slur</span> detector</h1>

          {toxicStatus === 'toxic'
            ? (
              <>
                <p className={`text-[#FF0000] font-medium lg:text-[35px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] text-center `}>Oh No .<br />The Text is Toxic !!</p>
              </>
            )
            : toxicStatus === 'non-toxic'
              ? (
                <>
                  <p className={`text-[#95FF66] font-medium lg:text-[35px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] text-center`}>No need to worry .<br />The Text is Not Toxic .</p>
                </>
              )
              : (
                <>
                  <p className={`${styles.heroSubText} text-center  text-[#000000]`}>Enter image of the chat and find out if the texts are toxic or not .<br /> Please wait a few seconds</p>
                  
                </>
              )
          }
          <div className="mt-3 flex items-center justify-center">
            { selectedImage==null?
            (<>
            <label htmlFor="imageInput" className="btn btn-3 hover-border-3 " style={{ marginLeft: '2px' }}>
            <span>ADD IMAGE</span>
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageInputChange}
          />
          </>
          )
:
(
  <>
  <MoonLoader
                  color="#706c61"
                  speedMultiplier={0.4}
                  /> 
  </>
)
            }

            
          </div>
        </div>
        {/* End of main content */}
      </div>

      <ComputersCanvas />

      {/* Your Main Content Div */}
      <style jsx>{`
        .main-content {
          position: absolute;
          z-index: 2; /* Adjust the z-index value to place it above ComputersCanvas */
        }
      `}</style>
    </section>
  );
}

export default Hero;
