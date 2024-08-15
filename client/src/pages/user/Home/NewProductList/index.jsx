import { useEffect, useState } from "react";
import { getProducts } from "apis/product";
import ProductCard from "./ProductCard";

function NewProductList() {
    const [newProductList, setNewProductList] = useState([]);

    const fetchProducts = async () => {
        const response = await getProducts({
            limit: 9,
            sortBy: "createdAt",
            sortOrder: "desc",
        });
        setNewProductList(response.content);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="w-full">
            <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                NEW PRODUCTS
            </h3>
            <div className="flex flex-wrap mx-[-10px] mt-2">
                {newProductList.map((el, index) => (
                    <ProductCard key={index} data={el} />
                ))}
            </div>
        </div>
    );
}

export default NewProductList;
