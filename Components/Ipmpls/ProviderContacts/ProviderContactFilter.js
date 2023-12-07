import SearchField from "../../Layout/SearchField"

export default function ProviderContactFilter ({ searchValue, onChangeSearch }) {

    return(
        <>
            <SearchField searchValue={searchValue} onChangeSearch={onChangeSearch} />
        </>
    )
}