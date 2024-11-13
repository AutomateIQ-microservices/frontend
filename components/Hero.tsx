"use client"
import { useRouter } from "next/navigation";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import Feature from "./Feature";

export default function Hero(){
    const router=useRouter();
    return <div>
        <div className="flex justify-center">
            <div className="font-semibold text-5xl text-center pt-12 max-w-xl">
                Automate without limits
            </div>
        </div>
        <div className="flex justify-center pt-2">
            <div className="font-normal text-xl text-center pt-8 max-w-3xl">
                Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. The only limit is your imagination.
            </div>
        </div>

        <div className="flex justify-center pt-4">
            <div className="flex">
                <PrimaryButton onClick={()=>{
                    router.push("/signup");
                }} size="big">Get Started free</PrimaryButton>
                <div className="pl-4">
                    <SecondaryButton onClick={() => {}} size="big">Contact Sales</SecondaryButton>
                </div>
               
            </div>
        </div>
        <div className="flex justify-center pt-4">
            <Feature title="Free forever" subtitle="for core feature"></Feature>
            <Feature title="More apps" subtitle="than any other platform"></Feature>
            <Feature title="Cutting edge" subtitle="AI features"></Feature>
        </div>
        
        
    </div>
}