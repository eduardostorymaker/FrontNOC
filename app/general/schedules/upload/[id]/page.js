import scheduleGroup from "../../../../../data/navigation/scheduleGroup.json"

import ScheduleUploadTemplate from "../../../../../Components/General/Schedule/ScheduleUploadTemplate"



export default function scheduleUploadDynamic ({ params }) {

    return(
        <ScheduleUploadTemplate scheduleGroup={scheduleGroup} paramId={params.id} />
        
    )
}