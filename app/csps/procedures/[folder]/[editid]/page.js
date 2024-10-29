import ProceduresEdit from "../../../../../Components/Csps/Procedures/ProceduresEdit"

export default function editidroamingprocedures ({ params }) {
    console.log("params")
    console.log(params)
    return(
        <ProceduresEdit params={params} />
    )
}