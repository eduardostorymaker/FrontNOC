export default function ProviderContactItem({ provider, subject, to, cc, body, telephone, type }) {

    const href = `mailto:${to?to:""}?cc=${cc?cc:""}&subject=${subject?subject:""}&body=${body?body:""}`
  
    return(
        <div className="flex flex-col p-4 rounded-xl bg-red-500 text-white justify-between">
            <div className="flex flex-col">
                <div>
                    <span className="pr-2 text-red-200">
                        Tipo: 
                    </span>
                    <span>
                        {type?.toUpperCase()}
                    </span>
                </div>
                <div>
                    <span className="pr-2 text-red-200">
                        Proveedor: 
                    </span>
                    <span className="font-bold">
                        {provider?.toUpperCase()}
                    </span>
                </div>
                <div>
                    <span className="pr-2 text-red-200">
                        Teléfonos: 
                    </span>
                    <span className="font-bold">
                        {telephone}
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