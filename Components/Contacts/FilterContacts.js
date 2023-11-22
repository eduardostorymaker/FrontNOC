export default function FilterContacts ({ searchWord }) {
    
    return (
        <div className="p-4">
            <input 
                placeholder="Buscar..." 
                className="rounded-lg h-8 px-2"
                onChange={searchWord}
            />
        </div>
    )
}