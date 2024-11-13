"use client"

import AppBar from "@/components/AppBar";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import CheckedFeature from "@/components/CheckedFeature";
import Input from "@/components/InputField";
import { useState } from "react";

const Signup=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
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
                <div className="flex-1 pt-6 px-4 border pb-6 mt-12">
                    <Input label="Name" placeholder="Your Name" onChange={(e)=>{
                        setName(e.target.value);
                        console.log(name);
                    }}/>

                    <Input label="Email" placeholder="Your Email" onChange={(e)=>{
                        setEmail(e.target.value);
                        console.log(email);
                    }}/>

                    <Input label="Password" placeholder="Your Password" onChange={(e)=>{
                        setPassword(e.target.value);
                        console.log(password);
                    }} type="password"/>
                    <div className="pt-4">
                        <PrimaryButton onClick={()=>{}} size="big">Get started free</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Signup;