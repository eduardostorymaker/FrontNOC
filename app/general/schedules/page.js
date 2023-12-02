"use client"

import { redirect } from "next/navigation"

import scheduleGroup from "../../../data/navigation/scheduleGroup.json"

export default async function schedules () {

    const idGroup = scheduleGroup[0].id
    redirect(`/general/schedules/group/${idGroup}`)
 
}