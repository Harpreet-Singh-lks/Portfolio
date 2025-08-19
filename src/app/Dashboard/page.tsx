"use client";

import React,{useState, useEffect} from "react";
import Navbar from "../components/navbar";
import Searchbar from '../components/searchbar';
//import {motion} from 'framer-motion'// why it didnt use framer-motion

const Dashboard= ()=>{
  const [activeTab, setActiveTab]= useState('home');
  //const words = ["backend systems", "web3 products"];// what to do about word 

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh]">
        <h1 className="font-['Space_Grotesk'] text-center font-bold leading-tight text-4xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight">
        Hi, I'm <span className="text-blue-500">Harpreet 👋</span>
        </h1>

        <h2 className="mt-6 sm:mt-8 text-center font-semibold text-muted-foreground leading-snug text-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.75rem] tracking-tight [text-wrap:balance]">
        <span className="block text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl">
          & I love building scalable
        </span>
        <span className="block">
          <span
            className="
              relative mx-auto flex items-center justify-center
              h-10 sm:h-12 md:h-14
              px-2 sm:px-3
              w-fit min-w-[160px] sm:min-w-[200px]
              transition-[width] duration-300
            "
          >
            <span className="absolute inset-0 flex items-center justify-center animate-rotateWord1 whitespace-nowrap text-indigo-400 text-xl sm:text-2xl md:text-4xl">
              backend systems
            </span>
            <span className="absolute inset-0 flex items-center justify-center animate-rotateWord2 whitespace-nowrap text-emerald-400 text-xl sm:text-2xl md:text-4xl">
              web3 products
            </span>
          </span>
        </span>
          
        </h2>
        <Searchbar/>
      </div>
      </main>
    </div>
      

       
  )
}
export default Dashboard;

