import { ReactNode } from "react";

const LinkButton=({children,onClick}:{children:ReactNode , onClick:()=>void})=>{
    return <div className="py-2 px-4 cursor-pointer flex flex-col items-center justify-center font-light text-sm hover:bg-slate-100 rounded-md" onClick={onClick}>
        {children}
    </div>
}

export default LinkButton;