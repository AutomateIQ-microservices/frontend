const ZapCell=({name,index}:{
    name?:string,
    index:number
})=>{
    return <div className="border border-black px-8 py-8 flex w-[500px] justify-center cursor-pointer">
        <div className="flex text-xl">
            <div className="font-bold">
                {index}. 
            </div>
            <div>
                {name}
            </div>
        </div>
    </div>
}

export default ZapCell;