import paths from "constant/path";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { useCategoryStore } from "store/category.store";
// import { getCategoriesRequest } from "redux/slicers/category.slicer";
// import { setFilterParams } from "redux/slicers/common.slicer";
import ICONS from "utils/icons";

function Sidebar() {
    // const dispatch = useDispatch();
    // const { data: categories, loading } = useSelector(
    //     (state) => state.category
    // );
    // console.log("🚀 ~ Sidebar ~ categories:", categories);
    // const { filterParams } = useSelector((state) => state.common);

    const { fetchCategory, data } = useCategoryStore();
    console.log("🚀 ~ Sidebar ~ data:", data);

    useEffect(() => {
        fetchCategory({ keyword: "" });
    }, []);

    return (
        <div className="flex flex-col border rounded">
            <div className="px-5 pt-[15px] pb-[14px] bg-main text-white flex gap-1  items-center ">
                <ICONS.AiOutlineMenu />
                <span> DANH SÁCH DANH MỤC</span>
            </div>

            {data.map((cate, index) => (
                <NavLink
                    key={index}
                    // onClick={() =>
                    //     // dispatch(
                    //     //     setFilterParams({
                    //     //         ...filterParams,
                    //     //         category: cate.title,
                    //     //     })
                    //     // )
                    // }
                    to={{
                        pathname: paths.PRODUCTS,
                        // search: QueryString.stringify({
                        //     ...filterParams,
                        //     category: cate.title,
                        // }),
                    }}
                    className={({ isActive }) =>
                        `px-5 pt-[15px] pb-[14px] text-sm hover:bg-main hover:text-white border  ${
                            isActive && "bg-main text-white"
                        }`
                    }
                >
                    <div className="flex gap-3 items-center ">
                        <span>
                            <img
                                src={cate?.thumb}
                                alt=""
                                className="object-cover w-[30px] h-[30px]"
                            />
                        </span>
                        <span className="font-bold">{cate?.name}</span>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;
