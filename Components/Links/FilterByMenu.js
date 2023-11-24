import MenuSubmenu from "../Layout/MenuSubmenu";

export default function FilterByMenu({ selectFilter, changeSelection, dataFilter }) {

    return(
        <MenuSubmenu changeSelection={changeSelection} dataFilter={dataFilter} />
    )
}