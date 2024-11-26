"use client"
import { BACKEND_URL } from "@/app/config";
import AppBar from "@/components/AppBar";
import LinkButton from "@/components/buttons/LinkButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Input from "@/components/InputField";
import ZapCell from "@/components/ZapCell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//we need to fetch all the available actions and available triggers for while loading the page

function useZaplist(){
    const [availableTriggers,setAvailableTriggers]=useState([])

    const [availableActions,setAvailableActions]=useState([])


    useEffect(()=>{
        //logic to fetch all the available triggers and actions to display 
        axios.get(`${BACKEND_URL}/api/v1/available-actions`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=> {
            setAvailableActions(res.data);
        });



        //fetch all the available Triggers

        axios.get(`${BACKEND_URL}/api/v1/available-triggers`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }).then(res=> {
            setAvailableTriggers(res.data);
        });
    },[])

    return {availableTriggers,availableActions}
}

const CreateZap=()=>{
    const router=useRouter();
    const [selectedTrigger,setSelectedTrigger]=useState<{
        available_trigger_id:string | undefined,
        availableTriggerName:string | undefined
    }>();
    const [selectedActions,setSelectedActions]=useState<{
        available_action_id:string | undefined,
        availableActionName:string | undefined,
        metadata:any
    }[]>([]);


    const [selectedModalIndex,setSelectedModalIndex]=useState<null | number>(null);

    const {availableTriggers,availableActions}=useZaplist();

    useEffect(()=>{
        console.log(availableTriggers);
        console.log(availableActions);
    },[availableActions,availableTriggers]);

    return <div>
        <AppBar/>
        <div className="flex justify-end bg-slate-200 p-4">
            <PrimaryButton onClick={async()=>{
                if(!selectedTrigger?.available_trigger_id){
                    return;
                }
                const response=await axios.post(`${BACKEND_URL}/api/v1/zaps/`,{
                        "available_trigger_id": selectedTrigger?.available_trigger_id,
                        "metadata": {},
                        "actions": selectedActions?.map(a=>({
                                "available_action_id":a.available_action_id,
                                "metadata":a.metadata 
                            })
                    )
                    },{
                        headers:{
                            "Authorization":`Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                console.log(response);
                router.push("/dashboard")
            }}>
                Publish
            </PrimaryButton>
        </div>
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full">
                <ZapCell name={selectedTrigger?selectedTrigger.availableTriggerName:"Trigger" } index={1} onClick={()=>{
                    setSelectedModalIndex(1);
                }}/>
            </div>
            <div className="justify-center w-full pt-2 pb-2">
                {selectedActions.map((action,index)=>
                    <div key={index} className="flex justify-center pt-2">
                        <ZapCell name={action.availableActionName? action.availableActionName:"Action"} index={2+index} onClick={()=>{
                            setSelectedModalIndex(2+index)
                        }}/>
                    </div>
                )}   
            </div> 
            <div className="flex justify-center">
                <div>
                    <LinkButton onClick={()=>{
                        setSelectedActions(a=>[...a,{
                            available_action_id:"",
                            availableActionName:"",
                            metadata:{}
                        }])
                    }}><div className="text-2xl">+
                        </div></LinkButton>
                </div>
            </div>
        </div>
        {selectedModalIndex && <Modal index={selectedModalIndex} onSelect={(props: null |{name:string ,id:string , metadata:any})=>{
            if(props==null){
                setSelectedModalIndex(null);
                return;
            }

            if(selectedModalIndex===1){
                setSelectedTrigger({
                    available_trigger_id:props?.id,
                    availableTriggerName:props?.name,
                })
            }
            else{
                setSelectedActions(a =>{
                    let newActions=[...a];
                    newActions[selectedModalIndex-2]={
                        available_action_id:props?.id,
                        availableActionName:props?.name,
                        metadata:props.metadata
                    }
                    return newActions;
                });
            }

            // Close the modal after updating state
            setSelectedModalIndex(null);
        }} availableItems={selectedModalIndex===1?availableTriggers:availableActions}/>}
    </div>
}

export default CreateZap;


function Modal({index,onSelect,availableItems}:{index:number,onSelect:(props:null | {name:string,id:string,metadata:any})=>void ,  availableItems:{
    id:string,
    name:string,
    image:string
}[]}){

    const [step,setStep]=useState(0);
    const [selectedAction,setSelectedAction]=useState<{
        id:string,
        name:string
    }>();
    const isTrigger=index===1;

   

    return <div id="default-modal"   className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex bg-slate-100 bg-opacity-85">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold">
                    {index==1?"Select Trigger":"Select Action"}
                </h3>
                <button type="button" onClick={()=>{
                    onSelect(null);
                }}className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                {step===1 && selectedAction?.name=="email" && <EmailSelctor setMetadata={(metadata)=>{
                    onSelect({
                        ...selectedAction,
                        metadata
                        
                    })
                }}/>}
                {step===1 && selectedAction?.name=="message" && <MessageSelector setMetadata={(metadata)=>{
                    onSelect({
                        ...selectedAction,
                        metadata
                    })
                }}/>}
                {step===0 && <div> {availableItems.map(({id,name,image})=>{
                        return <div key={id} className="flex border p-4 cursor-pointer hover:bg-slate-100" onClick={()=>{
                                if(isTrigger){
                                    onSelect({
                                        id,name,
                                        metadata:{}
                                    })
                                }else{
                                    setStep(s=>s+1);
                                    setSelectedAction({
                                        id,
                                        name
                                    })
                                }
                            }  
                        }>
                            <img src={image} width="30" className="rounded-full"></img>
                            <div className="flex flex-col justify-center pl-2">{name}</div>
                        </div>
                    })}</div>
                }
            </div>
        </div>
    </div>
</div>
}


function EmailSelctor({setMetadata}:{
    setMetadata:(params:any)=>void;
}){
    const [email,setEmail]=useState("");
    const [body,setBody]=useState("");

    return <div>
        <Input type="text" label="To" placeholder="to address" onChange={(e)=>{setEmail(e.target.value)}}/>
        <Input type="text" label="Body" placeholder="body" onChange={(e)=>{setBody(e.target.value)}}/>
        <PrimaryButton onClick={()=>{
            setMetadata({email,body})
        }}> Submit </PrimaryButton>
    </div>
}

function MessageSelector({setMetadata}:{
    setMetadata:(params:any)=>void;
}){
    const [message,setMessage]=useState("");
    const [body,setBody]=useState("");
    return <div>
        <Input type="text" label="To" placeholder="to address" onChange={(e)=>{setMessage(e.target.value)}}/>
        <Input type="text" label="Body" placeholder="body" onChange={(e)=>{setBody(e.target.value)}}/>
        <PrimaryButton onClick={()=>{
            setMetadata({message,body})
        }}> Submit </PrimaryButton>
    </div>
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



