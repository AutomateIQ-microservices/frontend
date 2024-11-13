"use client"

import { useRouter } from "next/navigation";
import LinkButton from "./buttons/LinkButton";
import PrimaryButton from "./buttons/PrimaryButton";

const AppBar=()=>{
    const router=useRouter();
    return <div className="flex border-b justify-between p-2">
        <div className="py-2 px-4 text-xl font-bold">
            AutomateIQ
        </div>
        <div className="flex">
            <LinkButton onClick={()=>{}}>Contact Sales</LinkButton>
            <LinkButton onClick={()=>{
                router.push("/login");
            }}>LogIn</LinkButton>

            <PrimaryButton onClick={()=>{
                router.push("/signup")
            }}>SignUp</PrimaryButton>
        </div>

    </div>
}


export default AppBar;