export default function SearchField ({ searchValue, onChangeSearch }) {

    return (
        <div className="h-full flex items-center px-2">
            <input 
                placeholder="Buscar..." 
                className="rounded-lg h-8 px-2"
                onChange={onChangeSearch}
                value={searchValue}
            />
        </div>
    )
}