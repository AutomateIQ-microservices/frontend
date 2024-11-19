import { ReactNode } from "react";

const DarkButton=({children , onClick }:{children:ReactNode,onClick:()=>void })=>{
    return <div className={`flex flex-col justify-center cursor-pointer hover:shadow-md bg-purple-900 text-white rounded text-center px-8 py-2 font-semibold`} 
    onClick={onClick} >
        {children}
    </div>
}

export default DarkButton;