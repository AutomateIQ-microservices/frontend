"use client"
import AppBar from "@/components/AppBar";
import DarkButton from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import LinkButton from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

function ZapTable({zaps}:{zaps:Zaps[]}){
    const router=useRouter()
    return <div className="p-8 max-w-screen-lg w-full">
            <div className="flex border-b">
                <div className="flex-1">Work flow</div>
                <div className="flex-1">Name</div>
                <div className="flex-1">Last Edit</div>
                <div className="flex-1">WebHook URL</div>
                {/* <div className="flex-1">Running</div> */}
                <div className="flex-1">Go</div>
            </div>
            {zaps.map(zap=>
                <div key={zap.id} className="flex border-b py-4">
                    <div className="flex-1">{zap.triggerName.name+" -> "}{zap.actionNames.map(action=> action.name+ " -> ")}</div>
                    <div className="flex-1">{zap.id}</div>
                    <div className="flex-1">November 11</div>
                    <div className="flex-1"> {`${HOOKS_URL}/hooks/catch/1/${zap.id}`}</div>
                    <div className="flex-1"><LinkButton onClick={()=>{
                        router.push("/zap/"+zap.id)
                    }}>Go</LinkButton></div>
                </div>
            )}
        </div>
}

const Dashboard=()=>{
    const {loading,zaps}=useZaps();

    const router=useRouter();

    return <div>
        <AppBar/>
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                <div className="flex justify-between pr-8">
                    <div className="text-2xl font-bold">
                        My Automates
                    </div>
                    <DarkButton onClick={()=>{
                        router.push("/zap/create")
                    }}>
                        Create
                    </DarkButton>
                </div>
            </div>
        </div>
        {loading?"loading ..." : <div className="flex justify-center ">
            <ZapTable zaps={zaps}/>
            </div>}
    </div>
}

interface Zaps{
    "id":string,
    "triggerName":{
        id:string,
        image:string | null
        name:string
    },
    "actionNames":{
        id:string,
        image:string | null
        name:string
    }[]
}
function useZaps(){
    const [loading,setLoading]=useState(true);
    const [zaps,setZaps]=useState<Zaps[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/zaps/`,{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=>{
            console.log(res.data)
            setZaps(res.data)
        }).then(()=>setLoading(false))
    },[])

    return {loading,zaps};
}



export default Dashboard;


