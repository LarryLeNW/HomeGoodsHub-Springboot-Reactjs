import "bootstrap/dist/css/bootstrap.css";
import "../home/HomePages.scss";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import TruncateText from "services/TruncateText";
import ProductCarousel from "pages/product/ProductCarousel";

const HomePages = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [sendMail, setSendMail] = useState("");
    const pageSize = 12;

    const handleSendMail = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/user/sendMail/${sendMail}`
            );
            console.log(response.data);
            toast.success("Gửi mail thành công !");
        } catch (error) {
            console.log("lỗi gửi mail: ", error);
        }
    };
    useEffect(() => {
        const showProduct = async (page) => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/user/homepage`,
                    {
                        params: {
                            page: page,
                            pageSize: pageSize,
                        },
                    }
                );
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.log("Error: " + error);
            }
        };
        showProduct(currentPage);
    }, [currentPage]);

    const handlePageClick = (event) => {
        const newPage = event.selected;
        setCurrentPage(newPage);
    };

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setProductId(product.productId);
    };
    const handleAddCart = async () => {
        console.log("dataa customer" + customer);

        console.log(customer.customerId);
        try {
            await axios.post(
                "http://localhost:8080/api/user/cart/add",
                {
                    product: { productId: parseInt(productId) },
                    quantity: parseInt(quantity),
                    customer: { customerId: customer.customerId },
                },
                {
                    headers: { "Content-Type": "application/json" },
                    Authorization: `Bearer ${customer.token}`,
                }
            );
            toast.success("Thêm sản phẩm thành công");
            console.log("Thêm sp thành công");
        } catch (error) {
            console.log("Lỗi thêm sản phẩm: " + error);
            toast.error("Lỗi thêm sản phẩm");
        }
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    return (
        <>
            <div>
                <div
                    id="carousel1"
                    class="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div class="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carousel1"
                            data-bs-slide-to="0"
                            class="active"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carousel1"
                            data-bs-slide-to="1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carousel1"
                            data-bs-slide-to="2"
                        ></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img
                                src="./images/banner2.webp"
                                alt="Los Angeles"
                                class="d-block w-100"
                            />
                        </div>
                        <div class="carousel-item">
                            <img
                                src="./images/banner1.webp"
                                alt="Chicago"
                                class="d-block w-100"
                            />
                        </div>
                        <div class="carousel-item">
                            <img
                                src="./images/banner3.webp"
                                alt="New York"
                                class="d-block w-100"
                            />
                        </div>
                    </div>
                    <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carousel1"
                        data-bs-slide="prev"
                    >
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carousel1"
                        data-bs-slide="next"
                    >
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
            <div className="row">
                {products.map((product, index) => (
                    <div className="col-md-3 mt-5" key={index}>
                        <div className="card" style={{ minHeight: "400px" }}>
                            <div className="productName">
                                {" "}
                                <TruncateText
                                    text={product.name}
                                    maxLength={20}
                                />{" "}
                            </div>
                            <div className="text-end discount">
                                {" "}
                                - {product.discount} %
                            </div>
                            <div className="card-body">
                                <img
                                    src={`http://localhost:8080/getimage/${product.image}`}
                                    alt=""
                                    style={{ height: "300px", width: "260px" }}
                                />
                                <div className="product-info">
                                    <button
                                        className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => handleShowModal(product)}
                                    >
                                        Mua Ngay
                                    </button>
                                </div>
                                <div>
                                    <p className="price mt-3">
                                        Giá hiện tại:{" "}
                                        {formatCurrency(
                                            (product.unitPrice *
                                                (100 - product.discount)) /
                                                100
                                        )}
                                    </p>
                                    <s className="giaGoc">
                                        Giá gốc:{" "}
                                        {formatCurrency(product.unitPrice)}{" "}
                                    </s>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination-container">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
            {/* banner */}
            <br />
            <div>
                <img
                    src="./images/banner.webp"
                    alt="Chicago"
                    class="d-block w-100"
                    style={{ height: "450px" }}
                />
            </div>
            <br />
            <div>
                <ProductCarousel></ProductCarousel>
            </div>{" "}
            <br /> <br />
            <div className="nhanbantin">
                <div>
                    <h2>ĐĂNG KÝ NHẬN BẢN TIN</h2>
                    <h5>
                        Đăng ký nhận bản tin để chúng tôi liên hệ với bạn, để
                        được cập nhật những mẫu thiết kế mới nhất
                    </h5>
                    <br />
                    <div class="bantin ">
                        <input
                            type="text"
                            placeholder="Hãy nhập email của bạn tại đây ..."
                            onChange={(e) => setSendMail(e.target.value)}
                        />
                        <button
                            className="btn btn-dark ms-1"
                            onClick={handleSendMail}
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            {selectedProduct && (
                                <div className="row">
                                    <div className="col-md-5">
                                        <img
                                            src={`http://localhost:8080/getimage/${selectedProduct.image}`}
                                            alt=""
                                            style={{
                                                height: "420px",
                                                width: "280px",
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="form-group">
                                            <strong>
                                                {selectedProduct.name}
                                            </strong>
                                        </div>
                                        <div className="form-group mt-3">
                                            <p>
                                                Thương Hiệu:{" "}
                                                {selectedProduct.category.name}
                                            </p>
                                        </div>
                                        <div className="form-group mt-3">
                                            <span>
                                                {selectedProduct.description}
                                            </span>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="">Số lượng: </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={quantity}
                                                onChange={(e) =>
                                                    setQuantity(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-group mt-5">
                                            <p>
                                                Giá sản phẩm:{" "}
                                                {formatCurrency(
                                                    selectedProduct.unitPrice
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleAddCart}
                            >
                                Thêm sản phẩm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default HomePages;
