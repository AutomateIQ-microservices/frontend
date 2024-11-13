import { ReactNode } from "react";


const SecondaryButton=({children , onClick , size="small"}:{children:ReactNode,onClick:()=>void , size?: "big" | "small"})=>{
    return <div className={`${size==="small"?"text-sm":"text-xl"} ${size==="small"?"px-8 py-2":"px-10 py-4"} text-black font-bold rounded-full flex flex-col justify-center cursor-pointer hover:shadow-md border border-black border-solid`} 
    onClick={onClick} >
        {children}
    </div>
}

export default SecondaryButton;