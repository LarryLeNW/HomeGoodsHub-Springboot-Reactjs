// import { getProduct, getProducts } from "apis/product";
// import BreadCrumb from "components/BreadCrumb";
// import Button from "components/Form/Button";
// import SliderCustom from "components/SliderCustom";
// import { ProductExtraInformation } from "constant";
// import * as DOMPurify from "dompurify";
// import withBaseComponent from "hocs";
// import { useCallback, useEffect, useState } from "react";
// import Slider from "react-slick";
// import { formatMoney, renderStars } from "utils/helper";
// import SelectQuantity from "../../../components/Form/SelectQuantity";
// import { Breadcrumb, notification, Space } from "antd";
// import ICONS from "utils/icons";
// import { Link } from "react-router-dom";
// import QueryString from "qs";
// import { useCommonStore } from "store/common.store";
// import { useCartStore } from "store/cart.store";
// import { useAuthStore } from "store/auth.store";

// function DetailProduct({ params }) {
//     const { addCartRequest, fetchCarts } = useCartStore();
//     const { userInfo } = useAuthStore();

//     const { showModal } = useCommonStore();
//     // const { productDetail } = useSelector((state) => state.product);
//     const [currentProduct, setCurrentProduct] = useState(null);
//     const { id, title, category } = params;
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [quantity, setQuantity] = useState(1);

//     // const { filterParams } = useSelector((state) => state.common);

//     // const fetchRelatedProducts = async () => {
//     //     const response = await getProducts({ category });
//     //     if (response.success) setRelatedProducts(response.data);
//     // };

//     useEffect(() => {
//         showModal({ isShowModal: true });

//         const fetch = async () => {
//             const res = await getProduct(id);
//             setCurrentProduct(res);
//         };

//         if (id) {
//             fetch();
//         }
//         // if (category) fetchRelatedProducts(category);
//         showModal({ isShowModal: false });

//         window.scrollTo(0, 0);
//     }, [category, id]);

//     const handleQuantity = useCallback(
//         (input) => {
//             if (!Number(input) || Number(input) < 1) return;
//             setQuantity(+input);
//         },
//         [quantity]
//     );

//     const handleClickQuantity = (flag) => {
//         if (flag == "minus") {
//             if (quantity <= 1) return;
//             setQuantity((prev) => prev - 1);
//         }
//         if (flag == "plus") {
//             if (quantity > currentProduct?.quantity) return;
//             setQuantity((prev) => prev + 1);
//         }
//     };

//     let handleAddCart = () => {
//         if (!userInfo.data) {
//             notification.warning({
//                 message: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.",
//                 duration: 1,
//             });
//             return;
//         }
//         addCartRequest(
//             currentProduct.productId,
//             userInfo.data.userId,
//             quantity,
//             () => {
//                 fetchCarts(userInfo.data?.userId);
//             }
//         );
//     };

//     return (
//         <div className="w-full">
//             <div className="w-main m-auto bg-white flex">
//                 {/* image product review */}
//                 <div className="w-2/5 ">
//                     <div className=" h-[458px] flex justify-center items-center w-full">
//                         {currentProduct?.thumb && (
//                             <img
//                                 src={currentProduct?.thumb}
//                                 alt="sub-img"
//                                 className=" w-full h-full object-contain "
//                             />
//                         )}
//                     </div>
//                     <div className="w-full ">
//                         <Slider
//                             {...{
//                                 infinite: true,
//                                 slidesToShow: 3,
//                                 slidesToScroll: 1,
//                                 autoplay: true,
//                                 autoplaySpeed: 2000,
//                                 pauseOnHover: true,
//                             }}
//                             className="image-slider"
//                         >
//                             {currentProduct?.images?.split(",").map((el) => (
//                                 <div className="p-2  w-1/3 " key={el}>
//                                     <img
//                                         src={el}
//                                         alt="sub-img"
//                                         className=" h-[143px] w-full border object-contain "
//                                     />
//                                 </div>
//                             ))}
//                         </Slider>
//                     </div>
//                 </div>

//                 {/* info product */}
//                 <div className="w-2/5  p-4">
//                     <div className="flex justify-between">
//                         <h2 className="text-[30px] font-semibold ">
//                             {formatMoney(currentProduct?.unitPrice)} VNĐ
//                         </h2>
//                         <span className="text-yellow-600">
//                             Còn {currentProduct?.quantity} cái
//                         </span>
//                     </div>
//                     <div className="flex gap-2 items-center">
//                         <div className="flex">
//                             {renderStars(5).map((el, index) => (
//                                 <span key={index}>{el}</span>
//                             ))}
//                         </div>
//                         <span className="text-red-400">
//                             (Đã bán {currentProduct?.sold} cái)
//                         </span>
//                     </div>
//                     <div className="p-2 text-gray-500 ">
//                         {currentProduct?.description}
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <div className="flex items-center gap-2">
//                             <span className="font-semibold text-sm">
//                                 Quantity :{" "}
//                             </span>
//                             <SelectQuantity
//                                 quantity={quantity}
//                                 handleQuantity={handleQuantity}
//                                 handleClickQuantity={handleClickQuantity}
//                             />
//                         </div>
//                         <Button
//                             name={"Add"}
//                             fw={true}
//                             handleClick={handleAddCart}
//                             iconAfter={<ICONS.FaCartPlus />}
//                         />
//                     </div>
//                 </div>

//                 {/* extra info */}
//                 <div className="w-1/5 p-4 flex flex-col gap-3">
//                     {ProductExtraInformation.map((el) => (
//                         <div
//                             key={el.id}
//                             className="flex items-center gap-2 border p-2"
//                         >
//                             <span className="p-4 text-white bg-gray-800 rounded-full flex justify-center items-center">
//                                 {el.icon}
//                             </span>
//                             <div className="flex flex-col ">
//                                 <span className="font-medium">{el.title}</span>
//                                 <span className="text-sm">{el.sub}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* <div className="w-main m-auto mt-8">
//                 <h3 className="text-[20px] mb-2 font-semibold py-[15px] border-b-2 border-main">
//                     Sản phẩm liên quan
//                 </h3>
//                 <SliderCustom
//                     products={relatedProducts}
//                     settings={{
//                         ...{
//                             dots: true,
//                             infinite: true,
//                             slidesToShow: 4,
//                             slidesToScroll: 2,
//                             autoplay: true,
//                             autoplaySpeed: 2000,
//                             pauseOnHover: true,
//                         },
//                     }}
//                     normal={true}
//                 />
//             </div> */}
//         </div>
//     );
// }

// export default withBaseComponent(DetailProduct);
