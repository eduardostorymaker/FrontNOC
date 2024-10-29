"use client"

import Link from "next/link";
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

export default function ProceduresFolders ({ params }) {

    const paramsGroupId = params.folder.split("-")[1]
    const paramsGroup = params.folder.split("-")[0]

    console.log("params.folder")
    console.log(paramsGroup)
    const files = ["uno","dos"]

    const router = useRouter()

    // const searchParams = useSearchParams()
 
    // const name = searchParams.get('name')
    // const path = searchParams.get('path')
    // const group = searchParams.get('group')

    const [image, setImage] = useState(null)
    const [createObjectURL, setCreateObjectURL] = useState(null)
    const [fileSelected,setFileSelected] = useState(false)
    const [failedMessage, setFailedMessage] = useState("Elegir un archivo.")
    const [typeOfFile,setTypeOfFile] = useState("img")
    const [fileName,setFileName] = useState("")
    const [dataList,setDataList] = useState("")
    const [askForData,setAskForData] = useState(false)
    const [tryingUpload,setTryingUpload] = useState(false)
    const [addNew,setAddNew] = useState(false)
    const [canEdit,setCanEdit] = useState(false)
    console.log("image")
    console.log(image)
    console.log("createObjectURL")
    console.log(createObjectURL)

    const fileSource = "http://172.19.128.128:4444/cspsImages/procedures"

    useEffect(()=>{
        const api = "http://172.19.128.128:3061/api/csps/procedures"
        fetch(api,{cache: "no-store"})
            .then( res => res.json())
            .then( data => setDataList(data.data))
    },[askForData])

    const loadToClient = (e) => {
        if(e.target.files[0] && e.target.files) {
            console.log(e.target.files[0])
            if(e.target.files[0].type.includes("image/png") || e.target.files[0].type.includes("image/jpeg"))
            {
                setImage(e.target.files[0])
                setCreateObjectURL(URL.createObjectURL(e.target.files[0]))
                setFileSelected(true)
                setFailedMessage(null)
                setTypeOfFile("img")
            } else if (e.target.files[0].type.includes("sheet") || e.target.files[0].type.includes("csv") || e.target.files[0].type.includes("excel") || e.target.files[0].type.includes("pdf") ) {
                setImage(e.target.files[0])
                setCreateObjectURL(URL.createObjectURL(e.target.files[0]))
                setFileSelected(true)
                setFailedMessage(null)
                setTypeOfFile("xls")
            }
        }
    }

    const loadToServer = async () => {

        try {
            setTryingUpload(true)
            const formData = new FormData()
            formData.append("file",image)
            formData.append("path",paramsGroup)
            formData.append("name",fileName?fileName:"archivo")
    
            const response = await fetch("http://172.19.128.128:3061/api/filesystem/cspsprocedures",{
                method: 'POST',
                body: formData
            })
            const dataResponse = await response.json()
            console.log(dataResponse)

            if (dataResponse.status === "success") {
                console.log("Exitoso")

                try {
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            file: dataResponse.name,
                            name: fileName?fileName:"archivo",
                            group: paramsGroupId,
                            priority: 10
                        })
                    }
                    const api = "http://172.19.128.128:3061/api/csps/procedures"
            
                    const response = await fetch(api,requestOptions)
                    const dataInfo = await response.json()
                    if (dataInfo.error) {
                        throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
                    }
                    console.log(dataInfo) 
                    setAskForData(!askForData)
                    setFileName("")
                    setCreateObjectURL(null)
                    setImage(null)
                    setTryingUpload(false)
                    // router.push(`/general/schedulesv2/view?group=${params.group}`)
                    // setTryToDb(tryToDbStates.success)
                    // setCanEdit(false)
                    // setAreThereChanges(false)
                } catch (errorDB) {
                    setTryingUpload(false)
                    console.log("Error en la DB")
                    console.log(errorDB)
                    //setTryToDb(tryToDbStates.fault)   
                }
    
                
            } else {
                throw new Error("No se puedo subir el archivo al servidor!!")
            }
            
        } catch (errorFile) {
            setTryingUpload(false)
            console.log("Error en upload")
            console.log(errorFile)
            //setTryToDb(tryToDbStates.fault)   
        }
    }

    return (
        <div>
            <div>
                <div className="flex justify-between">
                    <div>
                        <div className="p-2 text-[28px]">
                            {
                                dataList
                                ?
                                dataList[0].group
                                :
                                paramsGroup
                                
                            }
                        </div>
                    </div>
                    <div className="h-[30px] w-[30px] text-red-500 m-2">
                        <Link href={"/csps/procedures"} className="h-full w-full text-red-500" >
                            <ArrowBackIcon className="h-full w-full" />
                        </Link>
                    </div>
                </div>
                <div className={addNew?"border-[1px] border-red-800":""}>
                    <div className="flex justify-end">
                        <div className="h-[40px] w-[40px] cursor-pointer" >
                            {
                                addNew
                                ?
                                ""
                                :
                                <EditIcon className="h-full w-full text-yellow-400" onClick={()=>setCanEdit(!canEdit)} />
                                
                            }
                        </div>
                        <div className="h-[40px] w-[40px] cursor-pointer" onClick={()=>setAddNew(!addNew)}>
                            {
                                addNew
                                ?
                                <CancelIcon className="h-full w-full text-red-400" />
                                :
                                <AddCircleIcon className="h-full w-full text-yellow-400"  />
                                
                            }
                        </div>
                    </div>
                    <div>
                        {
                            addNew
                            ?
                            (
                            tryingUpload
                            ?
                            "Cargando Archivo al servidor..."
                            :
                                <div className="uploadfile h-50px">
                                    <div className="flex">
                                        <div className="w-full flex justify-center items-center">
                                            <div className="p-2">
                                                Nombre del archivo:
                                            </div>
                                            <input type="text" value={fileName} onChange={(e)=>setFileName(e.target.value)} className=" border-[1px] border-red-500 rounded-sm p-2 h-[48px]" />
                                        </div>
                                        <form className="flex justify-evenly w-full items-center py-2">
                                            <input
                                                className="hidden" 
                                                type="file"
                                                name="file"
                                                id="file"
                                                onChange={loadToClient}
                                            />
                                            <label 
                                                for="file" 
                                                className="flex items-center h-full border-2 border-red-500 bg-red-500 p-2 text-white hover:bg-white hover:text-red-500 transition:all duration-300 "
                                            >
                                                Elegir archivo
                                            </label>
                                            
                                            {
                                                image
                                                ?
                                                <button
                                                type="button"
                                                onClick={loadToServer}
                                                className={"text-white bg-yellow-400 p-2 h-full"}
                                                >
                                                    Subir archivo
                                                </button>
                                                :
                                                ""
                                            }
                                            
                                        </form>
                                        <div className="w-full flex justify-center  items-center">
                                            {
                                                image
                                                ?
                                                <div>
                                                    {
                                                        image.name
                                                    }
                                                </div>
                                                :
                                                failedMessage
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            ""
                        }
                    </div>
                </div>
                <div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
                        {   
                            dataList
                            ?
                            dataList.map( item =>
                                <div key={item.id} className="rounded-sm border-[1px] border-red-500" >
                                    {
                                        canEdit
                                        ?
                                        <div className="flex">
                                            <Link className="text-yellow-400 cursor-pointer" href={`/csps/procedures/${params.folder}/${item.id}`}>
                                                <EditIcon />
                                            </Link>
                                        </div>
                                        :
                                        ""
                                    }
                                    <Link 
                                        className=""
                                        href={`${fileSource}/${item.folder}/${item.file}`} 
                                        target="_blank"
                                    >
                                        <div className="p-2 bg-white text-red-800 ">
                                            
                                            <div>
                                                {
                                                    item.name
                                                }
                                            </div>
                                            <div className="text-[12px] text-gray-500">
                                                {
                                                    item.file
                                                }
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                            :
                            "Cargando..."
                        }
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
