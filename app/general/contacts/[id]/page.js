"use client"

import { useState,useEffect } from "react"
import SaveIcon from '@mui/icons-material/Save';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditGroupListCompoment from "../../../../Components/General/Edit/EditGroupListComponent";

const orderByPriority = (data) => {
    return data.sort((a,b) => a.priority-b.priority)
}

const statesMessages = {
    saved: "La informacion se guardo correctamente!",
    failed: "La información no puedo ser actualizada en la base de datos",
    inProgress: "Se esta intentando guardar la información...",
    none: ""
}

const actionToDo = {
    add: "add",
    delete: "delete",
    modified: "modified",
    none: "none" 
}

const addToDo = (data) => {
    return {
        ...data,
        lines: data.lines.map(item => {
            return({
                ...item,
                todo: "none"
            })
        })
    }
}

export default function editcontact ({ params }) {

    

    return(
        <div>
            <EditGroupListCompoment params={params} />
        </div>

    )
}