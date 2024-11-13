import { ReactNode } from "react";

const PrimaryButton=({children , onClick , size="small"}:{children:ReactNode,onClick:()=>void , size?: "big" | "small"})=>{
    return <div className={`${size==="small"?"text-sm":"text-xl"} ${size==="small"?"px-8 py-2":"px-10 py-4"} text-white font-bold bg-orange-500 rounded-full flex flex-col justify-center cursor-pointer hover:shadow-md text-center`} 
    onClick={onClick} >
        {children}
    </div>
}

export default PrimaryButton;