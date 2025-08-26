'use client'

import React, { useState } from "react";
import Navbar from "../components/navbar";


const Blog = ()=>{

    const [activeTab, setActiveTab]= useState('blog');
    return(
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
        {/* Navbar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
        {/* Page Content */}
        <main className="flex-1 flex flex-col items-start justify-start pl-[20%] pr-6 pt-24">
          <h1 className="text-3xl font-semibold tracking-tight text-blue-500">/Blog</h1>
        </main>
      </div>
      
    )
}
export default Blog;
