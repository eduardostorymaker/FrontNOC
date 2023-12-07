"use client"

import SearchField from "../../Layout/SearchField";

export default function RoamingContactFilter ({ searchValue,onChangeSearch }) {

    return(
        <>
            <SearchField searchValue={searchValue} onChangeSearch={onChangeSearch} />
        </>
    )
}