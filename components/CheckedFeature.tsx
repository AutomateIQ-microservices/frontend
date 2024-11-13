import { ReactNode } from "react";

const CheckedFeature=({children}:{children:ReactNode})=>{
    return <div className="flex">
        <GreenCheck/>
        {children}
    </div>
}

export default CheckedFeature;


function GreenCheck(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}