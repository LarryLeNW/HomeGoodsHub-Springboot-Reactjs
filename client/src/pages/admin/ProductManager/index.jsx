import { Button, notification } from "antd";
import { deleteProduct, getProductCategories, getProducts } from "apis";
import DOMPurify from "dompurify";
import withBaseComponent from "hocs";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { formatMoney } from "utils/helper";
import path from "constant/path";
import { useCommonStore } from "store/common.store";

function ProductManager() {
    const navigate = useNavigate();
    const { showModal } = useCommonStore();
    const [products, setProducts] = useState({ data: [] });
    console.log("🚀 ~ ProductManager ~ products:", products);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [params, setParams] = useState({
        keywords: "",
        page: 1,
        limit: process.env.REACT_APP_LIMIT_PAGE,
    });
    const [isLoadingActions, setIsLoadingActions] = useState({
        loading: false,
        pid: null,
    });
    const [hoveredProductId, setHoveredProductId] = useState(null);

    const keywordParamDebounce = useDebounce(keyword, 500);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [params]);

    useEffect(() => {
        handleFilter("keywords", keywordParamDebounce);
    }, [keywordParamDebounce]);

    const fetchProducts = async () => {
        showModal({ isShowModal: true, isAction: true });
        try {
            const response = await getProducts(params);
            setProducts(response);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            showModal({ isShowModal: false });
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getProductCategories();
            setCategories(response.content);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const handleFilter = (key, value) => {
        setParams((prev) => {
            if (key == "keywords") {
                delete prev.minPrice;
                delete prev.maxPrice;
            }

            return {
                ...prev,
                [key]: value,
                page: 1,
            };
        });
    };

    const handleChangePage = (page) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const handleMouseEnter = (productId) => setHoveredProductId(productId);
    const handleMouseLeave = () => setHoveredProductId(null);

    const handleDelete = async (pid, index) => {
        const result = await Swal.fire({
            text: "Are you sure you want to remove this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            confirmButtonColor: "green",
            cancelButtonColor: "red",
        });

        if (result.isConfirmed) {
            setIsLoadingActions({ loading: true, pid });
            try {
                await deleteProduct(pid);
                notification.success({
                    message: "Product deleted successfully",
                });
                fetchProducts();
            } catch (error) {
                notification.error({ message: "Failed to delete product" });
            } finally {
                setIsLoadingActions({ loading: false, pid: null });
            }
        }
    };

    const handleSortChange = (e) => {
        const [sortBy, sortOrder] = e.target.value.split("_");
        handleFilter("sortBy", sortBy);
        handleFilter("sortOrder", sortOrder);
    };

    return (
        <div className="w-full p-4 flex flex-col overflow-auto">
            <div className="h-[75px] flex gap-2 items-center justify-between p-2 border-b border-blue-300">
                <div className="text-3xl font-bold">Manage Products</div>
                <div className="flex gap-4">
                    <div className="border border-main p-2 rounded h-full flex flex-col gap-2">
                        <span className="text-white">Search By Category:</span>
                        <select
                            onChange={(e) =>
                                handleFilter("category", e.target.value)
                            }
                            className="w-full text-black"
                        >
                            <option value="">All categories</option>
                            {categories.map((el) => (
                                <option key={el.categoryId} value={el.name}>
                                    {el.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-around gap-2 items-center h-[15vh] text-black p-2">
                    <div className="border border-main p-2 rounded h-full flex flex-col gap-2">
                        <span className="text-white">Sort By:</span>
                        <select
                            onChange={handleSortChange}
                            className="w-full text-black"
                        >
                            <option value="" disabled>
                                Select an option
                            </option>
                            <option value="unitPrice_asc">
                                Low To High Price
                            </option>
                            <option value="unitPrice_desc">
                                High To Low Price
                            </option>
                            <option value="sold_desc">Most Purchases</option>
                            <option value="quantity_desc">
                                High To Low Quantity
                            </option>
                            <option value="quantity_asc">
                                Low To High Quantity
                            </option>
                        </select>
                    </div>
                    <div className="border border-main p-4 rounded h-full">
                        <span className="text-white">Filter Price:</span>
                        <div className="flex gap-1">
                            <input
                                type="number"
                                placeholder="Price From"
                                onChange={(e) =>
                                    handleFilter("minPrice", e.target.value)
                                }
                                className="p-2 outline-main"
                            />
                            <input
                                type="number"
                                placeholder="Price To"
                                onChange={(e) =>
                                    handleFilter("maxPrice", e.target.value)
                                }
                                className="p-2 outline-main"
                            />
                        </div>
                    </div>
                    <div className="border border-main p-4 rounded h-full flex justify-around items-center gap-2">
                        <input
                            type="text"
                            value={keyword}
                            placeholder="Search products by keyword..."
                            onChange={(e) => setKeyword(e.target.value)}
                            className="p-2 flex-2 outline-main"
                        />
                        <Button
                            className="text-white flex-1 cursor-pointer border text-sm bg-green-600"
                            onClick={() => navigate(path.ADMIN.UPDATE_PRODUCT)}
                        >
                            Create Product
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full text-right">
                <Pagination
                    currentPage={params.page}
                    totalCount={products.totalElements}
                    handleChangePage={handleChangePage}
                />
            </div>
            <div className="flex flex-col border justify-between">
                <table className="table-auto mb-1 text-left w-full border-separate border border-slate-400">
                    <thead className="font-bold bg-gray-700 text-[13px] text-center border border-blue-300">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Sold</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Updated At</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.content?.map((p, index) => (
                            <tr
                                key={p.productId}
                                className="hover-row relative"
                                onMouseEnter={() =>
                                    handleMouseEnter(p.productId)
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <td className="px-4 py-1 border border-slate-500">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-1 border border-slate-500 text-sm">
                                    {p.name}
                                </td>
                                <td className="px-4 py-1 border border-slate-500">
                                    {formatMoney(p.unitPrice)}đ
                                </td>
                                <td className="px-4 py-1 border border-slate-500">
                                    {p.quantity}
                                </td>
                                <td className="px-4 py-1 border border-slate-500">
                                    {p.sold}
                                </td>
                                <td className="px-4 py-1 border border-slate-500 text-sm">
                                    {p.category.name}
                                </td>
                                <td className="px-4 py-1 border border-slate-500 text-sm">
                                    <span
                                        className="line-clamp-4"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                p.description
                                            ),
                                        }}
                                    />
                                </td>
                                <td className="px-4 py-1 border border-slate-500 text-sm">
                                    {moment(p.updatedAt).format("DD/MM/YYYY")}
                                </td>
                                <td className="px-4 py-8 h-full flex flex-col gap-4 items-center justify-between border border-slate-500">
                                    <Button
                                        className="px-2 bg-blue-600 cursor-pointer border text-white w-full"
                                        onClick={() =>
                                            navigate({
                                                pathname:
                                                    path.ADMIN.UPDATE_PRODUCT,
                                                search: `?edit=true&pid=${p.productId}`,
                                            })
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="px-2 text-light cursor-pointer border bg-red-600 text-white w-full"
                                        disabled={
                                            isLoadingActions.loading &&
                                            isLoadingActions.pid === p.productId
                                        }
                                        onClick={() =>
                                            handleDelete(p.productId, index)
                                        }
                                    >
                                        {isLoadingActions.pid === p.productId
                                            ? "Loading..."
                                            : "Delete"}
                                    </Button>
                                </td>
                                {hoveredProductId === p.productId && (
                                    <div className="absolute w-[200px] h-[200px] rounded top-[-180px] left-0 bg-gray-200 z-20 border-2 border-main shadow-md p-4">
                                        <img
                                            src={p.thumb}
                                            alt="Thumbnail"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default withBaseComponent(ProductManager);
