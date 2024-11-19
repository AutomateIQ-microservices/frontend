"use client"
import AppBar from "@/components/AppBar";
import ZapCell from "@/components/ZapCell";
import { useEffect, useState } from "react";

const CreateZap=()=>{
    const [selectedTrigger,setSelectedTrigger]=useState();
    const [selectedActions,setSelectedActions]=useState();
    return <div>
        <AppBar/>
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center">
                <ZapCell name={selectedTrigger?selectedTrigger:"Trigger" } index={1}/>
            </div>
            
        </div>
    </div>
}

export default CreateZap;

//we need to fetch all the available actions and available triggers for while loading the page

function useZaplist(){
    const [availableTriggers,setAvailableTriggers]=useState<{
        available_trigger_id:string,
        available_trigger_name:string
        }[]>([])

    const [availableActions,setAvailableActions]=useState<{
        available_action_id:string
        available_action_name:string
        }[]>([])


    useEffect(()=>{
        //logic to fetch all the available triggers and actions to display 
    },[])

    return {availableTriggers,availableActions}
}


//final request to be send to crete the zap POST:localhost:5768/api/v1/zaps/
// {
//     "available_trigger_id": "0d76a59c-653e-4676-9407-a915a35fa4d7",
//     "metadata": {
//       "key1": "value1",
//       "key2": "value2"
//     },
//     "actions": [
//       {
//         "available_action_id": "a6336bdc-c6f4-4aa2-926d-ab4e0e52d631",
//         "metadata": {
//           "actionKey1": "actionValue1"
//         }
//       },
//       {
//         "available_action_id": "1c3ed679-b52a-4481-b27a-33376e413c80",
//         "metadata": {
//           "actionKey2": "actionValue2"
//         }
//       }
//     ]
//   }
  