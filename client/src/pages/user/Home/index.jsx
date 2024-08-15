import withBaseComponent from "hocs";
import Sidebar from "./Sidebar";
import DealList from "./DealList";
import SlideBanner from "./SlideBanner";
import NewProductList from "./NewProductList";

function Home() {
    return (
        <div className="w-main mx-auto ">
            <div className="w-main flex mt-2  h-600px ">
                <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
                    <SlideBanner />
                </div>
                <div className="flex flex-col gap-5 w-[25%] flex-auto ">
                    <Sidebar />
                </div>
            </div>
            <div className="my-2">
                <DealList />
            </div>
            <div className="my-2">
                <NewProductList />
            </div>
            {/* <div className="my-8 mx-auto"> */}
            {/* <FeatureProducts /> */}
            {/* </div> */}
            {/* <div className="my-8 w-full mx-auto">
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2  border-main">
                    HOT COLLECTION
                </h3>
                <div className="flex flex-wrap gap-4 mt-4">
                    {categories.map((el, index) => {
                        if (el?.brands?.length > 0)
                            return (
                                <div
                                    key={index}
                                    className="w-[396px] cursor-pointer"
                                    onClick={() => {
                                        dispatch(
                                            setFilterParams({
                                                ...filterParams,
                                                category: el.title,
                                            })
                                        );
                                        navigate({
                                            pathname: path.PRODUCTS,
                                            search: QueryString.stringify({
                                                ...filterParams,
                                                category: el.title,
                                            }),
                                        });
                                    }}
                                >
                                    <div className="border flex p-4 gap-4 h-[300px] ">
                                        <img
                                            src={el?.thumb}
                                            alt=""
                                            className="flex-1 w-[144px] h-[129px]  object-contain my-auto"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-bold uppercase text-main">
                                                {el?.title}
                                            </h4>
                                            <ul className="flex flex-col justify-between h-full overflow-y-hidden ">
                                                {el?.brands?.map(
                                                    (item, index) => (
                                                        <li
                                                            key={index}
                                                            className="text-sm flex gap-2 text-main hover:bg-main  hover:text-white py-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                dispatch(
                                                                    setFilterParams(
                                                                        {
                                                                            ...filterParams,
                                                                            brand: item,
                                                                            category:
                                                                                el.title,
                                                                        }
                                                                    )
                                                                );
                                                                navigate({
                                                                    pathname:
                                                                        path.PRODUCTS,
                                                                    search: QueryString.stringify(
                                                                        {
                                                                            ...filterParams,
                                                                            brand: item,
                                                                            category:
                                                                                el.title,
                                                                        }
                                                                    ),
                                                                });
                                                            }}
                                                        >
                                                            <ICONS.IoMdArrowRoundForward />
                                                            <span className=" ">
                                                                {item}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                    })}
                </div>
            </div> */}
        </div>
    );
}

export default withBaseComponent(Home);
