import 'bootstrap/dist/css/bootstrap.css';
import './ManageProduct.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [editProductId, setEditProductId] = useState(null);
    const [addProducts, setAddProduct] = useState({
        name: '',
        quantity: '',
        unitPrice: '',
        image: '',
        description: '',
        discount: '',
        createDate: new Date().toISOString().slice(0, 10),
        status: true,
        category: {
            categoryId: "",
            name: ""
        }
    });
   

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAddProduct({ ...addProducts, image: file.name });
            console.log({ ...addProducts, image: file.name });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddProduct({ ...addProducts, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = categorys.find(category => category.categoryId === parseInt(e.target.value));
        setAddProduct({ ...addProducts, category: selectedCategory });
        console.log(selectedCategory);
    };

    const handleAddNewProducts = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/admin/products/add", addProducts, {
                headers: { "Content-Type": "application/json" },
            });
            const newProduct = response.data;
            setProducts([...products, newProduct]);
            resetForm();
            console.log("thành công " + newProduct);
        } catch (error) {
            console.log("lỗi " + error);
        }
    };

    const resetForm = () => {
        setAddProduct({
            name: '',
            quantity: '',
            unitPrice: '',
            image: '',
            description: '',
            discount: '',
            createDate: new Date().toISOString().slice(0, 10),
            status: true,
            category: {
                categoryId: "",
                name: ""
            }
        });
        setEditProductId(null);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response  =  await axios.put(`http://localhost:8080/api/admin/products/update/${editProductId}`, addProducts, {
                headers: { "Content-Type": "application/json" }
            });
            const updatedProducts = products.map(product => 
                product.productId === editProductId ? { ...product, ...addProducts } : product
            );
            setProducts(updatedProducts);
            resetForm();
            console.log("Cập nhật thành công");
        } catch (error) {
            console.log("Lỗi cập nhật sản phẩm " + error);
        }
    };

    const handleEdit = (product) => {
        setAddProduct({
            ...product,
            category: product.category
        });
        setEditProductId(product.productId);
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/products/delete/${productId}`);
            setProducts(products.filter(product => product.productId !== productId));
            console.log(productId);
        } catch (error) {
            console.log("Lỗi delete product" + error);
        }
    };

    useEffect(() => {
        const showProduct = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/products");
                setProducts(response.data);
            } catch (error) {
                console.log("Lỗi show product: " + error);
            }
        };
        showProduct();
    }, []);

    useEffect(() => {
        const showCbxCategory = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/categorys");
                setCategorys(response.data);
            } catch (error) {
                console.log("lỗi show cbx " + error);
            }
        };
        showCbxCategory();
    }, []);

    return (
        <>
            <div className="container">
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="productName">Tên sản phẩm</label>
                            <input type="text" value={addProducts.name} onChange={handleInputChange} className="form-control" name='name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Số lượng</label>
                            <input type="number" value={addProducts.quantity} onChange={handleInputChange} className="form-control" name='quantity' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="unitPrice">Đơn giá</label>
                            <input type="number" value={addProducts.unitPrice} onChange={handleInputChange} className="form-control" name='unitPrice' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Mô tả</label>
                            <textarea value={addProducts.description} onChange={handleInputChange} className="form-control" name='description' ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="discount">Giảm giá (%)</label>
                            <input type="number" value={addProducts.discount} onChange={handleInputChange} className="form-control" name='discount' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Danh mục</label>
                            <select name="category" value={addProducts.category.categoryId} onChange={handleCategoryChange} className="form-control">
                                {categorys.map((item, index) => (
                                    <option key={index} value={item.categoryId}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <button type="button" className="btn btn-primary" onClick={handleAddNewProducts}>Add</button>
                        <button type="button" className="btn btn-primary ms-2" onClick={handleUpdate}>Update</button>
                        <button type="button" className="btn btn-primary ms-2" onClick={resetForm}>Reset</button>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>Hình ảnh</label>
                            <input type="file" onChange={handleFileChange} className="form-control" name='image' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Discount</th>
                            <th>Create Date</th>
                            <th>Category</th>
                            <th>image</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.productId}</td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.unitPrice}</td>
                                <td>{product.description}</td>
                                <td>{product.discount}</td>
                                <td>{product.createDate}</td>
                                <td>{product.category.name}</td>
                                <td><img src={`http://localhost:8080/getimage/${product.image}`} alt="" style={{height: "100px",width: "100px"}} /></td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDelete(product.productId)}>Delete</button>
                                    <button onClick={() => handleEdit(product)} className='btn btn-primary ms-2'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManageProduct;
