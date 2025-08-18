"use client";

import React,{useState, useEffect} from "react";
import Navbar from "../components/navbar";
//import {motion} from 'framer-motion'// why it didnt use framer-motion

const Dashboard= ()=>{
  const [activeTab, setActiveTab]= useState('home');
  //const words = ["backend systems", "web3 products"];// what to do about word 

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-20 px-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-6xl font-bold text-center font-['Space_Grotesk']"> 
         Hi, I'm <span className="text-blue-500">Harpreet 👋</span> 
        </h1>
      <h2 className="mt-8 text-lg sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-center text-muted-foreground leading-snug">
         <span className="text-[0.75em] sm:text-[0.8em] md:text-[0.85em]">& I love building scalable</span> 
        <span className="block mt-2">
          <span className="relative block mx-auto h-12 w-[220px] sm:w-[260px] md:w-[300px] overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-center animate-rotateWord1 whitespace-nowrap text-indigo-400">
          backend systems
        </span>
        <span className="absolute inset-0 flex items-center justify-center animate-rotateWord2 text-emerald-400">
          web3 products
        </span>
          </span>
        </span>
      </h2>
        </div>
      </main>
    </div>
  )
}
export default Dashboard;

