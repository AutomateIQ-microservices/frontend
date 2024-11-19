"use client"
import AppBar from "@/components/AppBar"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import CheckedFeature from "@/components/CheckedFeature"
import  Input  from "@/components/InputField"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useRouter } from "next/navigation"

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const router=useRouter();

    return <div>
    <AppBar/>
    <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
            <div className="flex-1 pt-20 px-4">
                <div className="font-semibold text-3xl pb-4">
                    Join millions world-wide who automate their work using AutomateIQ
                </div>
                <div></div>
                <div className="pb-6 pt-4">
                    <CheckedFeature>Easy setup,no coding required</CheckedFeature>
                </div>
                <div className="pb-6">
                    <CheckedFeature>Free forever for core features</CheckedFeature>
                </div>
                <div className="pb-6">
                    <CheckedFeature>14-day trial of premium features and apps</CheckedFeature>
                </div>   
            </div>
            <div className="flex-1 pt-6 px-4 border rounded-md pb-6 mt-12">
                <Input label="Email" placeholder="Your Email" onChange={(e)=>{
                    setEmail(e.target.value);
                }}/>

                <Input label="Password" placeholder="Your Password" onChange={(e)=>{
                    setPassword(e.target.value);
                }} type="password"/>

                <div className="pt-4">
                    <PrimaryButton onClick={async()=>{
                        const response=await axios.post(`${BACKEND_URL}/api/v1/users/signin`,{
                            "email":email,
                            "password":password
                        });
                        localStorage.setItem("token",response.data);
                        console.log(response.data);
                        router.push("/dashboard");
                    }} size="big">Log In</PrimaryButton>
                </div>
            </div>
        </div>
    </div>
</div>
}

export default Login;