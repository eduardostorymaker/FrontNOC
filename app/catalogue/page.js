import ProductsShow from "../../Components/Product/ProductsShow";

export default function Catalogue() {

    const productList = [
        {
            id:"asdfdsafa",
            name:"producto 1",
            brand: "marca 1",
            quantity: 10,
            price: 12.80,
            url: "",
            categories: ["cat2","cat3"]
        },
        {
            id:"gfdsdgf",
            name:"producto 2",
            brand: "marca 2",
            quantity: 30,
            price: 12.80,
            url: "",
            categories: ["cat1","cat2","cat3"]
        }
    ]

    return(
        <>
            <p>Catalogo</p>
            <ProductsShow productList={productList} />
        </>
    )
}