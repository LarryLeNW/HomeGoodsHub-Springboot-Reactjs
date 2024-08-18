import { generatePath, useNavigate } from "react-router-dom";
import { formatMoney, renderStars } from "utils/helper";
import path from "constant/path";

function ProductCard({ data }) {
    const navigate = useNavigate();
    return (
        <div
            className="w-1/3 flex-auto px-[10px] mb-2 cursor-pointer"
            onClick={() =>
                navigate(
                    generatePath(path.DETAIL_PRODUCT, {
                        category: data?.category.name.toLowerCase(),
                        id: data?.productId,
                        title: data?.name,
                    })
                )
            }
        >
            <div className="flex w-full border p-2">
                <img
                    src={data?.thumb}
                    alt={data.name}
                    className="w-[90px] object-contain p-4"
                />
                <div className="flex flex-col gap-1 mt[15px] items-start w-full text-xs">
                    <span className="line-clamp-1 capitalize text-sm">
                        {data?.name.toLowerCase()}
                    </span>
                    <span className="flex h-4">
                        {renderStars(5, 14).map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                    </span>
                    <span>{formatMoney(data?.unitPrice)} VNĐ</span>
                    <span>Đã giảm : {data.discount}%</span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
