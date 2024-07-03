"use client"

export default function test1 () {

    const data = {
        titulo: "titulo"
    }

    const onSave = async () => {
        const methodHttp = 'GET'
        try {
            const requestOptions = {
                method: methodHttp,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
            const api = "http://172.19.128.128:3061/api/filesystem"
    
            const response = await fetch(api,requestOptions)
            const dataInfo = await response.json()
            if (dataInfo.error) {
                throw new Error("Error "+ dataInfo.status + ": " +dataInfo.error)
            }
            console.log("Data Guardada!!") 
            //setStateDb(statesMessages.saved)
            //setDataLinkGroup(addToDo(dataLinkGroup))

    
        } catch (error) {
            console.log("Error en el update")
            console.log(error)
            //setStateDb(statesMessages.failed)
        }
    }

    return(
        <div>
            Test1

            <div>
                <button className="bg-yellow-400 p-2" onClick={onSave}>
                    Enviar data
                </button>
            </div>
            <img src="http://172.19.128.128:3061/_next/image?url=%2Ffile%2FEnergia.jpg&w=640&q=75" />
        </div>
    )
}