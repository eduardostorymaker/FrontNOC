import ProviderContactItem from "./ProviderContactItem";

export default function ProviderContactGroup ({ providerDataFiltered }) {

    return(
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4" >
            {
                providerDataFiltered.map(item =>
                    <ProviderContactItem
                        key={item.id}
                        provider={item.attributes?.provider}
                        subject={item.attributes?.subject}
                        to={item.attributes?.to}
                        cc={item.attributes?.cc}
                        body={item.attributes?.body}
                        telephone={item.attributes?.telephone}
                        type={item.attributes?.providertype?.data?.attributes?.name}
                    />    
                )
            }
        </div>
    )
}