'use client'

import React, {useState} from "react";
import Navbar from "../components/navbar";

const Resume =()=>{
    const [activeTab, setActiveTab] = useState("resume");
    return (
        <div className="flex flex-col items-center gap-6 mt-20">
  <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

  <a
    href="https://drive.google.com/file/d/1ueDR1rZ2hCgi_Ahy6WMe2uGCaWKbBr4Y/view?usp=drivesdk"
    download
    className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition-colors"
  >
    Download Resume
  </a>

  
</div>
    )
}

export default Resume;