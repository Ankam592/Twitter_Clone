import React, { useEffect, useState } from "react";

const CollapsibleFolder = () => {
    const [collapse, setCollapse] = useState(false);
    const [pChecked, setpChecked] = useState(false);
    const [childBoxes, setchildBoxes] = useState({
        Desktop: false, Downloads: false, Documents: false, Pictures: false, Music: false, Videos: false, Screenshots: false
    })
    const [underter,setUndeter] = useState(false);
    useEffect(() => {
        const values = Object.values(childBoxes);
        const atleastOneChecked = values.some(val=> val);
        console.log(atleastOneChecked)
        if(atleastOneChecked)
            {
                  const allChecked = values.every(val => val);
                  if(allChecked)
                  {
                    setpChecked(allChecked)
                    setUndeter(false)
                  }
                  else
                  {
                    setpChecked(false)
                    setUndeter(true)
                  }
        
            }         // this will keep parent checkbox in sync
            else
            {
                setpChecked(false)
                setUndeter(false)
            }
    }, [childBoxes]);

    const checkParent = () => {
        setpChecked((prev) => {
            const newVal = !prev
            setchildBoxes(Object.fromEntries(Object.keys(childBoxes).map((child) => [child, newVal])));

            return newVal
        })// create an array from keys using Object.keys(childBoxes)  then convert this array to two alues [Desktop,true] then convert this to array
    }

    const arr = ['Desktop', 'Downloads', 'Documents', 'Pictures', 'Music', 'Videos', 'Screenshots']
    return (
        <div className="mt-7 w-full h-60 bg-[#FFFFFF] border-1 border-blue-200 rounded-lg flex-col justify-center items-start flex-wrap">
            <div className="py-1 w-full h-8 flex justify-center bg-[#D295BF]   "> <h1 className="text-[#000000] font-bold">Collapsible Folder</h1></div>
            <div className="w-full  bg-[#E0B8D3] flex justify-center items-start flex-wrap">

                <div className="w-full font-bold text-lg flex justify-center items-center flex-wrap "  >  <p onClick={() => setCollapse((prev) => !prev)}>{collapse ? '^' : '>'}</p> <h1 className="text-[#000000]">This PC  &nbsp;</h1>{ underter ? '-' : <input checked={pChecked} type="checkbox" onChange={() => checkParent()} />}
                    <div className="w-full  text-sm  flex justify-center  flex-wrap">
                        {collapse && arr.map((folder, index) => {
                            return <div className={`relative w-full h-7 flex justify-center items-center border-1 `} key={index}><p className="absolute left-87">  {'> ' + folder} &nbsp;  <input type="checkbox" checked={childBoxes[folder]} onChange={(e) => setchildBoxes((prev) => ({ ...prev, [folder]: e.target.checked }))} /> </p> </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollapsibleFolder;