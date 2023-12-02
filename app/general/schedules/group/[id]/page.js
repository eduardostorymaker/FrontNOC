"use client"

import { useState,useEffect } from "react"
import { useParams } from "next/navigation"

import scheduleGroup from "../../../../../data/navigation/scheduleGroup.json"

import ScheduleTemplate from "../../../../../Components/General/Schedule/ScheduleTemplate"


export default async function scheduleGroupDynamic () {

    const params = useParams()

    return(
        <>
            <ScheduleTemplate scheduleGroup={scheduleGroup} paramId={params.id} />
            
        </>
        
    )
}