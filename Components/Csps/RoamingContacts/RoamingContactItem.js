import { useRouter } from 'next/navigation';

import EditIcon from '@mui/icons-material/Edit';

export default function RoamingContactItem({ id, country, operator, to, cc, subject, body, phone, canEdit }) {

    const router = useRouter()

    const href = `mailto:${to?to:""}?cc=${cc?cc:""}&subject=${subject?subject:""}&body=${body?body:""}`
    
    return(
        <div className="flex flex-col p-4 rounded-xl bg-red-500 text-white justify-between">
            <div className="flex flex-col">
                <div>
                    <div>
                        {
                            canEdit
                            ?
                            <EditIcon onClick={()=>router.push(`/csps/roamingcontact/${id}`)} />
                            :
                            ""
                        }
                    </div>
                </div>
                <div>
                    <span className="pr-2 text-red-200">
                        País: 
                    </span>
                    <span>
                        {country?.toUpperCase()}
                    </span>
                </div>
                <div>
                    <span className="pr-2 text-red-200">
                        Operador: 
                    </span>
                    <span className="font-bold">
                        {operator}
                    </span>
                </div>
                <div>
                    <span className="pr-2 text-red-200">
                        Teléfonos: 
                    </span>
                    <span className="font-bold">
                        {phone}
                    </span>
                </div>
            </div>
            <div className="w-full flex justify-end mt-4">
                <a
                    href={href}
                    className="flex py-2 px-4 bg-yellow-500 rounded-xl hover:bg-white hover:text-red-500 transition-all "
                >
                    Enviar correo
                </a>

            </div>
        </div>
    )
}

//"mailto:roaming@du.ae; ohan.fernandes@du.ae?cc=gestionysupervision@claro.com.pe&subject=ROAMING EMIRATOS ARABES UNIDOS - DUBAI"